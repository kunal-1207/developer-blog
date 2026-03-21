import Link from 'next/link';
import { Post } from '@/lib/getPosts';

export default function PostCard({ post }: { post: Post }) {
    return (
        <article className="group relative flex flex-col items-start p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-gray-100 mb-2">
                <Link href={`/blog/${post.slug.toLowerCase()}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                </Link>
            </h2>
            <time className="relative z-10 order-first mb-3 flex items-center text-sm text-slate-500 dark:text-gray-500 pl-3.5" dateTime={post.date}>
                <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                    <span className="h-4 w-0.5 rounded-full bg-blue-500" />
                </span>
                {new Date(post.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
                <span className="mx-2">•</span>
                {post.readingTime} min read
            </time>
            <p className="relative z-10 mt-2 text-sm text-slate-600 dark:text-gray-400 leading-6">
                {post.description}
            </p>
            <div className="relative z-10 mt-4 flex gap-2">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </article>
    );
}
