import fs from 'fs';
import path from 'path';
import { getPosts } from './getPosts';
import { siteConfig } from './config';

export async function generateRSS() {
    const posts = await getPosts();
    const baseUrl = siteConfig.url;

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${siteConfig.title}</title>
  <link>${baseUrl}</link>
  <description>${siteConfig.description}</description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts
            .map(
                (post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/posts/${post.slug}</guid>
    </item>`
            )
            .join('')}
</channel>
</rss>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
}
