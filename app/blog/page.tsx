import PostCard from '@/components/PostCard';
import { getPosts } from '@/lib/getPosts';

export const metadata = {
    title: 'Blog | DevBlog',
    description: 'Sharing my thoughts on software engineering and architecture.',
};

export default async function BlogIndexPage() {
    const posts = await getPosts();

    return (
        <div className="space-y-12 pt-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-slate-900 dark:text-gray-100">
                    Everything I've written.
                </h1>
                <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl">
                    Deep dives into complex technical problems, architectural decisions, and the occasional 3AM debugging session.
                </p>
            </div>

            <div className="mt-16 sm:mt-20">
                <div className="md:border-l md:border-gray-100 dark:md:border-gray-800 md:pl-6 space-y-12">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
