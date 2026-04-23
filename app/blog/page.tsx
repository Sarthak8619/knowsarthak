import Link from 'next/link';
import { getAllPosts } from '@/src/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <h1 className="brutal-heading mb-12">Blog</h1>
      <div className="border-t-[3px] border-black">
        {posts.map(post => {
          const label = new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
          });
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border-b-[3px] border-black hover:bg-black hover:text-white transition-colors duration-100"
            >
              <div className="flex justify-between items-center py-5 px-1">
                <span style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: '1.1rem' }}>
                  {post.title}
                </span>
                <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.875rem' }}>
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
