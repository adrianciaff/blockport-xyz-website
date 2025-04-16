// src/app/blog/[slug]/page.tsx
import { getAllPostIds, getPostData, PostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import React from 'react'; // Ensure React is imported

// This function tells Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
  try {
      const paths = getAllPostIds();
      // console.log("[generateStaticParams] Paths:", paths); // Keep if useful
      return paths.map(p => ({ slug: p.params.slug }));
  } catch (error) {
      console.error("Error in generateStaticParams:", error);
      return []; // Return empty array on error
  }
}

// Define props structure, including params
interface PostProps {
  params: {
    slug: string;
  };
}

// Make the component async again
export default async function Post({ params }: PostProps) {
  const { slug } = params; // Access slug (Line 21 again approx)
  console.log(`[Post Component] Trying to render post for slug: ${slug}`);

  try {
    // Fetch the specific post data, including HTML content (runs on server)
    const postData: PostData = await getPostData(slug); // Calls the function with logs
    console.log(`[Post Component] Data fetched for slug ${slug}:`, { ...postData, contentHtml: '...' });

    return (
      <article className="container mx-auto px-4 py-8 prose lg:prose-xl"> {/* Basic container + Tailwind Typography */}
        <h1 className="text-4xl font-extrabold mb-4">{postData.title}</h1>
        <div className="text-gray-600 mb-6">
          {postData.date} {postData.author ? `by ${postData.author}` : ''}
        </div>
        {/* Render the HTML content fetched from the Markdown file */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
      </article>
    );
  } catch (error) {
    // If getPostData throws an error (e.g., file not found), show 404
    console.error(`[Post Component] Error fetching post data for slug: ${slug}`, error);
    notFound(); // Triggers Next.js 404 page
  }
}

// Keep generateMetadata commented out for now
/*
export async function generateMetadata({ params }: PostProps) { ... }
*/