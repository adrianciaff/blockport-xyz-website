// src/app/blog/page.tsx
import Link from 'next/link';
import { getSortedPostsData, PostData } from '@/lib/posts'; // Use path alias @/

export default function BlogIndex() {
  // Fetch post data directly (runs on server)
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <section className="container mx-auto px-4 py-8"> {/* Basic container */}
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-4">
        {allPostsData.map(({ id, date, title, author }) => (
          <li key={id} className="border-b pb-2">
            <Link href={`/blog/${id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
              {title}
            </Link>
            <br />
            <small className="text-gray-600">
              {date} {author ? `by ${author}` : ''}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}