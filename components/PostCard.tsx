'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PostData } from '@/lib/markdown';

export default function PostCard({ post }: { post: PostData }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {post.coverImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 rounded-full bg-blue-500 text-[10px] font-bold text-white uppercase tracking-wider">
                  {post.category}
              </span>
          </div>
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1" title="Published Date">
            <Calendar size={12} />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime || '5 min read'}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={`/posts/${post.slug}`} className="before:absolute before:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
