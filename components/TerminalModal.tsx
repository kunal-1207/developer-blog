'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TerminalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Welcome to DevBlog Terminal v1.0.0', 'Type "help" to see available commands.']);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    setOutput(prev => [...prev, `$ ${input}`]);
    
    switch (cmd) {
      case 'help':
        setOutput(prev => [...prev, 'Available commands:', '  about    - Go to about page', '  home     - Go to home page', '  posts    - List recent posts', '  clear    - Clear terminal', '  exit     - Close terminal']);
        break;
      case 'about':
        router.push('/about');
        onClose();
        break;
      case 'home':
        router.push('/');
        onClose();
        break;
      case 'posts':
        setOutput(prev => [...prev, '- Building Scalable Distributed Systems', '- Mastering Kubernetes in Production', '- The Future of Frontend']);
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'exit':
        onClose();
        break;
      case '':
        break;
      default:
        setOutput(prev => [...prev, `Command not found: ${cmd}`]);
    }
    
    setInput('');
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
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-2xl bg-[#1e1e1e] rounded-lg shadow-2xl border border-slate-700 z-[101] overflow-hidden font-mono"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <TerminalIcon size={14} />
                <span>kunal@devblog:~</span>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            
            {/* Terminal Body */}
            <div className="p-4 h-[300px] overflow-y-auto text-green-400 text-sm" onClick={() => inputRef.current?.focus()}>
              {output.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
              ))}
              <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
                <span className="text-blue-400 cursor-default">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-green-400"
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
