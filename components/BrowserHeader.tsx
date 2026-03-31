'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Search, Moon, Sun, Plus, MoreVertical, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { PostData } from '@/lib/markdown';

// Import New Modals
import TerminalModal from './TerminalModal';
import ContactModal from './ContactModal';
import ReadingListSidebar from './ReadingListSidebar';
import SettingsModal from './SettingsModal';

interface Tab {
  id: string;
  label: string;
  href: string;
  closable: boolean;
}

export default function BrowserHeader({ posts }: { posts: PostData[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Feature States
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  // Initial tabs
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const categories = Array.from(new Set(posts.map(post => post.category).filter(Boolean)));
    return [
      { id: 'home', label: 'New Tab', href: '/', closable: false },
      ...categories.map(cat => ({
        id: cat.toLowerCase(),
        label: cat,
        href: `/tab/${cat}`,
        closable: true
      }))
    ];
  });

  useEffect(() => setMounted(true), []);

  // Sync tabs with current pathname (re-add closed category tabs)
  useEffect(() => {
    if (pathname.startsWith('/tab/')) {
      const category = pathname.replace('/tab/', '');
      const id = category.toLowerCase();
      
      setTabs(prev => {
        if (!prev.find(t => t.id === id)) {
          return [...prev, { id, label: decodeURIComponent(category), href: pathname, closable: true }];
        }
        return prev;
      });
    }
  }, [pathname]);

  const results = searchQuery.trim() === ''
    ? []
    : posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (pathname.includes(id.toLowerCase())) {
        router.push('/');
    }
  };

  const activeTabId = tabs.find(t => t.href === pathname)?.id || 'home';

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-[#dee1e6] dark:bg-[#202124] border-b border-[#bdc1c6] dark:border-[#3c4043]">
      {/* Tab Row */}
      <div className="flex items-end px-2 pt-2 gap-1 overflow-x-auto no-scrollbar relative">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-2 px-3 pb-2 pt-1 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        </div>

        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            layoutId={tab.id}
            onClick={() => router.push(tab.href)}
            className={cn(
              "group relative flex items-center min-w-[140px] max-w-[200px] h-9 px-3 rounded-t-lg cursor-pointer transition-colors duration-200",
              activeTabId === tab.id
                ? "bg-[#f1f3f4] dark:bg-[#35363a] text-slate-900 dark:text-slate-100 z-10 before:absolute before:bottom-0 before:-left-2 before:w-2 before:h-2 before:rounded-br-lg before:shadow-[4px_0_0_0_#f1f3f4] dark:before:shadow-[4px_0_0_0_#35363a] after:absolute after:bottom-0 after:-right-2 after:w-2 after:h-2 after:rounded-bl-lg after:shadow-[-4px_0_0_0_#f1f3f4] dark:after:shadow-[-4px_0_0_0_#35363a]"
                : "text-slate-600 dark:text-slate-400 hover:bg-[#e8eaed] dark:hover:bg-[#2e2f33] border-r border-[#bdc1c6] dark:border-[#5f6368] last:border-r-0"
            )}
          >
            {/* Tab Shape Connectors (Left/Right) - CSS pseudo-elements like Chrome would be complex, using simple borders for now */}
            <span className="text-xs font-medium truncate flex-1 select-none">
              {tab.label}
            </span>
            {tab.closable && (
              <button
                onClick={(e) => closeTab(tab.id, e)}
                aria-label={`Close ${tab.label} tab`}
                className="ml-2 p-0.5 rounded-full hover:bg-[#d1d4d7] dark:hover:bg-[#4a4d51] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            )}
          </motion.div>
        ))}
        <button 
          aria-label="New tab"
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#d1d4d7] dark:hover:bg-[#2e2f33] mb-1 text-slate-600 dark:text-slate-400 shrink-0"
        >
            <Plus size={16} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center h-12 px-3 gap-3 bg-[#f1f3f4] dark:bg-[#35363a]">
        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
          <button aria-label="Go back" className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30" disabled>
            <ChevronLeft size={18} />
          </button>
          <button aria-label="Go forward" className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30" disabled>
            <ChevronRight size={18} />
          </button>
          <button aria-label="Reload page" onClick={() => window.location.reload()} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
            <RotateCcw size={18} />
          </button>
        </div>

        {/* Address Bar / Search */}
        <div className="relative flex-1 group">
          <div className={cn(
            "flex items-center w-full h-8 px-4 gap-3 rounded-full transition-all",
            isSearchFocused
              ? "bg-white dark:bg-[#202124] shadow-md ring-2 ring-blue-500/20"
              : "bg-[#e8eaed] dark:bg-[#202124] hover:bg-[#dee1e6] dark:hover:bg-[#242528]"
          )}>
            <div className="flex items-center gap-2 text-slate-500 flex-1 overflow-hidden">
                <Search size={14} className="shrink-0" />
                <input
                    type="text"
                    placeholder="Search posts or enter URL"
                    aria-label="Search blog posts"
                    className="bg-transparent border-none outline-none text-xs w-full text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => {
                        setIsSearchFocused(true);
                        setShowResults(true);
                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            setIsSearchFocused(false);
                            setShowResults(false);
                        }, 200);
                    }}
                />
            </div>
            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500"
            >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showResults && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#202124] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                {results.map((post) => (
                  <button
                    key={post.slug}
                    onClick={() => router.push(`/posts/${post.slug}`)}
                    className="flex flex-col w-full px-5 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                  >
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{post.title}</span>
                    <span className="text-xs text-slate-500 truncate">{post.excerpt}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          aria-label="More options" 
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Bookmarks Bar */}
      <div className="flex flex-wrap items-center h-8 px-2 gap-1 bg-[#f1f3f4] dark:bg-[#35363a] border-b border-[#bdc1c6] dark:border-[#3c4043] text-xs font-medium text-slate-600 dark:text-slate-300">
        
        {/*<button onClick={() => setIsTerminalOpen(true)} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="text-[14px]">⌨️</span> Terminal
        </button>*/}
        <button onClick={() => setIsContactOpen(true)} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-blue-600 dark:text-blue-400 font-bold">
          <span className="text-[14px]">💬</span> Hire Me
        </button>
        
        <button onClick={() => window.open('https://github.com', '_blank')} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <img src="https://github.githubassets.com/favicons/favicon.svg" alt="GitHub" className="w-3.5 h-3.5 dark:invert" /> GitHub
        </button>
        <button onClick={() => window.open('https://linkedin.com', '_blank')} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="text-blue-500 font-bold">in</span> LinkedIn
        </button>
        <button onClick={() => window.open('https://twitter.com', '_blank')} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="font-bold">𝕏</span> Twitter
        </button>

        <button onClick={() => setIsReadingListOpen(true)} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors ml-auto mr-1">
          <span className="text-[14px]">📚</span> Reading List
        </button>
        <button onClick={() => window.open('/feed.xml', '_blank')} className="flex items-center justify-center p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-orange-500" title="RSS Feed">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93v-2.83z"/></svg>
        </button>
      </div>

      {/* Interactive Modals */}
      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ReadingListSidebar isOpen={isReadingListOpen} onClose={() => setIsReadingListOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </header>
  );
}
