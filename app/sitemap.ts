import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/getPosts';
import { siteConfig } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts();
    const baseUrl = siteConfig.url;

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug.toLowerCase()}`,
        lastModified: new Date(post.date),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
        },
        ...postUrls,
    ];
}
