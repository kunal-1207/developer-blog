import { getPosts } from "@/lib/getPosts";
import PostCard from "@/components/PostCard";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="relative min-h-[calc(100vh-84px)]">
      <div className="relative z-10 space-y-12">
        <section className="space-y-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Digital <span className="text-blue-600 dark:text-blue-400">Engineering</span> Garden.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Exploring the intersection of distributed systems, cloud-native architecture, and high-performance frontend engineering.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>

        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-slate-500">No posts found in /content/posts</p>
          </div>
        )}
      </div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] -right-[10%] w-[35%] h-[35%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
