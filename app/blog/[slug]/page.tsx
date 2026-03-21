import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug } from '@/lib/getPostBySlug';
import { getPosts } from '@/lib/getPosts';
import components from '@/components/MDXComponents';
import GiscusComments from '@/components/GiscusComments';
import { TracingBeam } from '@/components/ui/TracingBeam';

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        slug: post.slug.toLowerCase(),
    }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};

    return {
        title: `${post.title} | DevBlog`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: ['Kunal'],
        },
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <TracingBeam className="px-6">
            <article className="py-12 max-w-3xl mx-auto relative z-10">
                <header className="mb-12 space-y-4 text-center">
                    <time className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white sm:text-6xl leading-[1.1]">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2 pt-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <MDXRemote source={post.content} components={components} />
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <GiscusComments />
                </div>
            </article>
        </TracingBeam>
    );
}
