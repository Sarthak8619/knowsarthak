import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export interface Post {
  slug: string;
  title: string;
  date: string;
}

export function getAllPosts(): Post[] {
  const dir = path.join(process.cwd(), 'content/blog');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const { data } = matter(fs.readFileSync(path.join(dir, filename), 'utf-8'));
      return { slug, title: data.title as string, date: data.date as string };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface PostWithContent extends Post {
  contentHtml: string;
}

export async function getPostBySlug(slug: string): Promise<PostWithContent> {
  const dir = path.join(process.cwd(), 'content/blog');
  const raw = fs.readFileSync(path.join(dir, `${slug}.md`), 'utf-8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    contentHtml: processed.toString(),
  };
}
