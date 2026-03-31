import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { remark } from 'remark';
import html from 'remark-html';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  contentHtml?: string;
  mdxSource?: any;
  readingTime?: string;
  tags: string[];
}

export async function getSortedPostsData(): Promise<PostData[]> {
  // Get file names under /content/posts
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        
        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const matterResult = matter(fileContents);
          const data = matterResult.data;

          // Ensure date is a string
          let dateStr = '';
          if (data.date instanceof Date) {
            dateStr = data.date.toISOString().split('T')[0];
          } else if (typeof data.date === 'string') {
            dateStr = data.date;
          } else {
            dateStr = new Date().toISOString().split('T')[0];
          }

          return {
            slug,
            title: data.title || 'Untitled',
            date: dateStr,
            category: data.category || 'General',
            excerpt: data.excerpt || data.description || '',
            tags: data.tags || [],
            coverImage: data.coverImage || null,
          } as PostData;
        } catch (error) {
          console.error(`Error parsing ${fileName}:`, error);
          return null;
        }
      })
  );

  // Filter out nulls from failed parses and sort by date
  return allPostsData
    .filter((post): post is PostData => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string): Promise<PostData> {
  // Try .mdx first, then .md
  let ext = '.mdx';
  let fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    ext = '.md';
    fullPath = path.join(postsDirectory, `${slug}.md`);
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Calculate reading time
  const wordCount = matterResult.content.split(/\s+/gu).length;
  const readingTime = `${Math.ceil(wordCount / 200)} min read`;

  if (ext === '.mdx') {
    // Use next-mdx-remote for MDX
    const mdxSource = await serialize(matterResult.content, {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
        format: 'mdx',
      },
      scope: matterResult.data,
    });
    return {
      slug,
      mdxSource,
      readingTime,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || new Date().toISOString(),
      category: matterResult.data.category || 'General',
      excerpt: matterResult.data.excerpt || '',
      tags: matterResult.data.tags || [],
      coverImage: matterResult.data.coverImage || null,
    } as PostData & { mdxSource: any };
  } else {
    // Use remark-html for .md
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    return {
      slug,
      contentHtml,
      readingTime,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || new Date().toISOString(),
      category: matterResult.data.category || 'General',
      excerpt: matterResult.data.excerpt || '',
      tags: matterResult.data.tags || [],
      coverImage: matterResult.data.coverImage || null,
    } as PostData;
  }
}

export function getAllCategories(posts: PostData[]): string[] {
    const categories = new Set(posts.map(post => post.category));
    return Array.from(categories);
}
