// src/app/admin/page.tsx
'use client'; // Still required

import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml'; // YAML parser
import CMS from 'decap-cms-app'; // Import the main CMS object directly

const AdminPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates if component unmounts quickly

    async function initializeCms() {
      try {
        console.log("Fetching config.yml...");
        // Fetch the config file from the public folder (served statically)
        const response = await fetch('/config.yml');
        if (!response.ok) {
          throw new Error(`Failed to fetch config.yml: ${response.status} ${response.statusText}`);
        }
        const yamlText = await response.text();
        console.log("config.yml fetched, parsing...");
        const config = yaml.load(yamlText); // Parse YAML text

        // Basic validation of parsed config
        if (!config || typeof config !== 'object') {
             throw new Error('Failed to parse config.yml or the content is invalid');
        }
        console.log("YAML parsed, initializing CMS...");

        // Initialize CMS with the loaded configuration
        // We assert the type to 'any' here because js-yaml's load result is broad;
        // Decap expects a specific object structure.
        CMS.init({ config: config as any });

        console.log("CMS initialization called.");

        // If component is still mounted, update loading state
        if (isMounted) {
          setIsLoading(false);
        }

      } catch (err) {
        console.error("Error initializing CMS:", err);
        if (isMounted) {
          // Store error message for display
          setError(err instanceof Error ? err.message : 'An unknown error occurred during CMS initialization');
          setIsLoading(false);
        }
      }
    }

    // Run the initialization function
    initializeCms();

    // Cleanup function to run when the component unmounts
    return () => {
      isMounted = false;
      console.log("AdminPage unmounted.");
      // Note: Decap CMS doesn't have a public `destroy` or `unmount` method,
      // so we just prevent state updates on unmount.
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Display loading or error messages
  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error loading CMS: {error}</div>;
  }

  if (isLoading) {
    // You might see this briefly before Decap takes over the page
    return <div style={{ padding: '20px' }}>Loading CMS configuration...</div>;
  }

  // Once CMS.init() runs successfully, Decap CMS usually manages the rendering itself,
  // often taking over the page body. Returning null tells React we're done rendering
  // from this component's perspective once loading/error is handled.
  return null;
};

export default AdminPage;