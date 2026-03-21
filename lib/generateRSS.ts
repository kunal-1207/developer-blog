import fs from 'fs';
import path from 'path';
import { getPosts } from './getPosts';

export async function generateRSS() {
    const posts = await getPosts();
    const baseUrl = 'https://your-domain.com'; // USER needs to update this

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>DevBlog</title>
  <link>${baseUrl}</link>
  <description>Deep dives into distributed systems, DevOps, and senior software architecture.</description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts
            .map(
                (post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
    </item>`
            )
            .join('')}
</channel>
</rss>`;

    const publicDir = path.join(process.cwd(), 'public');
    fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
}
