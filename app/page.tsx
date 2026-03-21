import Link from 'next/link';
import { getPosts } from '@/lib/getPosts';
import { siteConfig } from '@/lib/config';
import { Spotlight } from '@/components/ui/Spotlight';
import { BackgroundBeams } from '@/components/ui/BackgroundBeams';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
import { HoverEffect } from '@/components/ui/HoverEffect';

export default async function HomePage() {
  const allPosts = await getPosts();
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center justify-center py-12">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <BackgroundBeams />
      
      <div className="relative z-10 w-full space-y-24">
        {/* Hero Section */}
        <section className="space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-7xl text-slate-900 dark:text-white leading-[1.1]">
            Senior Backend Engineer <br />
            & <span className="text-blue-600 dark:text-blue-400">Architect.</span>
          </h1>
          <div className="max-w-2xl">
            <TextGenerateEffect 
                words="I build scalable systems and share my learnings on distributed systems, DevOps, and senior-level software architecture. Welcome to my digital garden."
                className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
            />
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-[1.05] active:scale-[0.95] shadow-2xl shadow-blue-500/20"
            >
              Read the blog
            </Link>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 px-8 py-4 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:scale-[1.05] active:scale-[0.95]"
            >
              Follow on GitHub
            </a>
          </div>
        </section>

        {/* Stats Section - Professional Persona */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-slate-100 dark:border-slate-800/50">
          {[
            { label: "Experience", value: "3+ Years" },
            { label: "Scale", value: "1M+ RPS" },
            { label: "Systems", value: "Cloud Native" },
            { label: "Focus", value: "Architecture" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">
                {stat.label}
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </section>

        {/* Featured Posts Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="text-2xl font-bold tracking-tight">Featured Posts</h2>
            <Link href="/blog" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              View all posts →
            </Link>
          </div>
          
          <HoverEffect 
            items={featuredPosts.map(post => ({
                title: post.title,
                description: post.description,
                link: `/blog/${post.slug.toLowerCase()}`,
                date: new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
                readingTime: post.readingTime,
                tags: post.tags
            }))}
          />
        </section>
      </div>
    </div>
  );
}
