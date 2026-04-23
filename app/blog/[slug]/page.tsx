import { getPostBySlug } from '@/src/lib/blog';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const label = new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <article className="max-w-2xl mx-auto px-6 py-16 md:py-24">
      <h1
        style={{
          fontFamily: '"Arial Black", Arial, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {post.title}
      </h1>
      <p
        className="mt-4 pb-8 mb-12 border-b-[3px] border-black"
        style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.875rem' }}
      >
        {label}
      </p>
      <div
        className="prose-brutal"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
