import Link from 'next/link';
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
    <>
      <div style={{ borderBottom: '1.5px solid #e8e8e8', padding: '0 3rem', height: '56px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display), sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#333' }}>
          ← ~/portfolio
        </Link>
      </div>
      <article style={{ maxWidth: '42rem', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display), sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '0.02em', color: '#0a0a0a' }}>
          {post.title}
        </h1>
        <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.85rem', marginTop: '1rem', paddingBottom: '1.8rem', marginBottom: '2.5rem', borderBottom: '1.5px solid #e8e8e8', color: '#999', fontWeight: 400 }}>
          {label}
        </p>
        <div className="prose-brutal" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </>
  );
}
