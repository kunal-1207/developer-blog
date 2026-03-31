import { getPostBySlug, getPosts } from "@/lib/getPosts";
import ReadingProgress from "@/components/ReadingProgress";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <article className="relative max-w-3xl mx-auto py-12">
        {/* Back navigation */}
        <Link 
            href="/" 
            aria-label="Back to all posts"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8 w-fit"
        >
          <ArrowLeft size={16} />
          Back to all posts
        </Link>
        
        {/* Header section */}
        <header className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg" aria-label={`Category: ${post.category}`}>
                {post.category}
            </span>
            <div className="flex items-center gap-2" title="Published Date">
              <Calendar size={14} />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </time>
            </div>
            <div className="flex items-center gap-2 text-slate-400" title="Reading Time">
              <Clock size={14} />
              {post.readingTime}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {post.coverImage && (
          <div className="relative h-[400px] w-full mb-12 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <section 
          className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-3xl"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />
        
        <footer className="mt-24 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <p className="text-sm font-medium text-slate-500">Thanks for reading! Feel free to share this post.</p>
                <div className="flex gap-4">
                    {/* Placeholder sharing buttons */}
                    <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-110 transition-transform">𝕏</button>
                    <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-110 transition-transform">in</button>
                </div>
            </div>
        </footer>
      </article>
    </>
  );
}
