import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    readingTime: number;
    content: string;
}

export async function getPosts(): Promise<Post[]> {
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '').toLowerCase();
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
            } as Post;
        });

    // Sort posts by date
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
