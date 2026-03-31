import { getPosts } from "@/lib/getPosts";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getPosts();
  const categories = Array.from(new Set(posts.map(post => post.category)));
  return categories.map((category) => ({
    category: category,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = await getPosts();
  const filteredPosts = posts.filter(post => post.category.toLowerCase() === decodedCategory.toLowerCase());

  if (filteredPosts.length === 0) {
    // If no posts in category, it might be a valid category but no posts yet, or just wrong.
    // Chrome tabs handle it gracefully, but we'll show filtered posts or notFound.
  }

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Category: <span className="text-blue-600 dark:text-blue-400">{decodedCategory}</span>
        </h1>
        <p className="text-slate-500 max-w-xl">
          Showing all technical articles related to {decodedCategory}.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>

      {filteredPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-slate-500">No posts found for this category.</p>
        </div>
      )}
    </div>
  );
}
