'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookMarked, Clock, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SavedPost {
  title: string;
  slug: string;
  timestamp: number;
}

export default function ReadingListSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const pathname = usePathname();

  // Pseudo-save feature for demo: auto-save visited posts
  useEffect(() => {
    if (pathname.startsWith('/posts/')) {
        const slug = pathname.replace('/posts/', '');
        const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        
        const existing = JSON.parse(localStorage.getItem('readingList') || '[]');
        const filtered = existing.filter((p: SavedPost) => p.slug !== slug);
        const newPosts = [{ title, slug, timestamp: Date.now() }, ...filtered].slice(0, 10);
        
        localStorage.setItem('readingList', JSON.stringify(newPosts));
        setSavedPosts(newPosts);
    } else {
        const existing = JSON.parse(localStorage.getItem('readingList') || '[]');
        setSavedPosts(existing);
    }
  }, [pathname, isOpen]);

  const clearList = () => {
    localStorage.removeItem('readingList');
    setSavedPosts([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-[#f1f3f4] dark:bg-[#202124] shadow-2xl z-[101] flex flex-col border-l border-[#bdc1c6] dark:border-[#3c4043]"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#bdc1c6] dark:border-[#3c4043] bg-white dark:bg-[#292a2d]">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookMarked size={16} className="text-blue-500" /> Reading List
              </h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X size={16} className="text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {savedPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-8 mt-10 text-slate-500">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <BookMarked size={20} />
                  </div>
                  <p className="text-sm font-medium">Your reading list is empty.</p>
                  <p className="text-xs mt-1">Read an article to save it here automatically.</p>
                </div>
              ) : (
                <div className="space-y-1 mt-2">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recently Viewed</span>
                    <button onClick={clearList} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
                        <Trash2 size={12} /> Clear
                    </button>
                  </div>
                  {savedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      onClick={onClose}
                      className="flex flex-col p-3 rounded-lg hover:bg-white dark:hover:bg-[#292a2d] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group"
                    >
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                        <Clock size={10} />
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
