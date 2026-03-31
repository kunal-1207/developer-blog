'use client';

import React from 'react';
import BrowserHeader from './BrowserHeader';
import { PostData } from '@/lib/markdown';

export default function BrowserLayout({
  children,
  posts
}: {
  children: React.ReactNode;
  posts: PostData[];
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] pt-[116px]">
      <BrowserHeader posts={posts} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        {children}
      </main>
      
      {/* Chrome-like Status Bar (Optional/Subtle) */}
      <footer className="fixed bottom-0 left-0 right-0 h-6 bg-[#f1f3f4] dark:bg-[#202124] border-t border-[#bdc1c6] dark:border-[#3c4043] flex items-center px-3 text-[10px] text-slate-500 gap-4 z-40">
        <div className="flex-1 opacity-60">Ready</div>
        <div className="flex gap-3">
            <span>Next.js 15</span>
            <span>UTF-8</span>
        </div>
      </footer>
    </div>
  );
}
