export const siteConfig = {
    title: 'DevBlog',
    description: 'A production-grade developer blog powered by Next.js and MDX.',
    author: 'Kunal',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://developer-blog-bay.vercel.app',
    github: 'https://github.com/kunal-1207/developer-blog',
    twitter: '@kunal_1207',
    giscus: {
        repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
        repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
        category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Announcements',
        categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
    },
};

export type SiteConfig = typeof siteConfig;
