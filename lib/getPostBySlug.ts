import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post } from './getPosts';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const fileNames = fs.readdirSync(postsDirectory);
    const fileName = fileNames.find(f => f.replace(/\.mdx$/, '').toLowerCase() === slug.toLowerCase());

    if (!fileName) {
        return null;
    }

    const fullPath = path.join(postsDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        readingTime: Math.ceil(stats.minutes),
        content,
    };
}
