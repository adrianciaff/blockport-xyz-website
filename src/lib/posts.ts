// src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // Parses frontmatter
import { remark } from 'remark'; // Markdown processor
import html from 'remark-html'; // Plugin to convert Markdown to HTML

// Define the path to the blog posts directory
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// Define the structure of post data we expect
export interface PostData {
  id: string; // The filename without .md (used as slug)
  title: string;
  date: string;
  author?: string; // Optional author
  contentHtml?: string; // Optional: only fetched for single post view
  [key: string]: any; // Allow other frontmatter fields
}

// Function to get sorted list of posts for the blog index page
export function getSortedPostsData(): PostData[] {
  // Get file names under /src/content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // Only include Markdown files
    .map((fileName) => {
      // Remove ".md" from file name to get id (slug)
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        title: matterResult.data.title || 'Untitled Post', // Default title
        date: matterResult.data.date || 'Unknown Date', // Default date
        author: matterResult.data.author || undefined,
        ...matterResult.data, // Include any other frontmatter data
      };
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Function to get all possible post IDs (slugs) for dynamic routing
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array that looks like:
  // [ { params: { id: 'first-post' } }, ... ]
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          // IMPORTANT: must match the param name in the dynamic route folder [slug] or [id]
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

// Function to get full data (including HTML content) for a single post
// src/lib/posts.ts

// ... (keep imports and postsDirectory definition) ...
// console.log('Posts Directory:', postsDirectory); // Optional: Log directory path once

export async function getPostData(id: string): Promise<PostData> {
    console.log(`[getPostData] Attempting to fetch post with id: ${id}`); // Log the incoming ID
  
    const fullPath = path.join(postsDirectory, `${id}.md`);
    console.log(`[getPostData] Reading file from path: ${fullPath}`); // Log the constructed path
  
    let fileContents;
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');
      console.log(`[getPostData] Successfully read file content (length: ${fileContents.length})`);
    } catch (err) {
      console.error(`[getPostData] Error reading file ${fullPath}:`, err);
      throw new Error(`Could not read post file for id: ${id}`); // Re-throw error
    }
  
    // Use gray-matter to parse the post metadata section
    let matterResult;
    try {
      matterResult = matter(fileContents);
      console.log('[getPostData] Parsed frontmatter data:', matterResult.data); // Log parsed data
      console.log(`[getPostData] Parsed content length: ${matterResult.content.length}`); // Log content length
    } catch (err) {
      console.error(`[getPostData] Error parsing frontmatter/content with gray-matter:`, err);
      throw new Error(`Could not parse Markdown file for id: ${id}`);
    }
  
  
    // Use remark to convert markdown into HTML string
    let processedContent;
    let contentHtml = '';
    try {
      processedContent = await remark()
        .use(html) // Use remark-html plugin
        .process(matterResult.content);
      contentHtml = processedContent.toString();
      console.log(`[getPostData] Successfully processed Markdown to HTML (length: ${contentHtml.length})`);
    } catch (err) {
        console.error(`[getPostData] Error processing Markdown with remark:`, err);
        // Decide if you want to throw or just have empty content
        // throw new Error(`Could not process Markdown content for id: ${id}`);
        contentHtml = '<p>Error processing Markdown content.</p>'; // Default error message?
    }
  
  
    // Combine the data with the id and contentHtml
    const postDataResult = {
      id,
      contentHtml,
      title: matterResult.data.title || 'Untitled Post', // Default title
      date: matterResult.data.date || 'Unknown Date', // Default date
      author: matterResult.data.author || undefined,
      ...matterResult.data,
    };
    console.log('[getPostData] Returning final post data:', { ...postDataResult, contentHtml: '...' }); // Log final data (abbreviate HTML)
  
    return postDataResult;
  }
  
  // ... (keep getSortedPostsData and getAllPostIds functions) ...