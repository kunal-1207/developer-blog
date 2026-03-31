'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, User, MessageSquare } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/mqkenryp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus('sent');
        setTimeout(() => { onClose(); setStatus('idle'); }, 2000);
      } else {
        setStatus('idle');
      }
    } catch (error) {
      setStatus('idle');
    }
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
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-[#1a1b1e] shadow-2xl z-[101] flex flex-col border-l border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-2xl">👋</span> Let's Talk!
              </h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {status === 'sent' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                  <p className="text-slate-500">I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Interested in working together or just want to say hi? Drop me a message below.
                  </p>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                      <User size={14} /> Name
                    </label>
                    <input required name="name" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                      <Mail size={14} /> Email
                    </label>
                    <input required name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                      <MessageSquare size={14} /> Message
                    </label>
                    <textarea required name="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" placeholder="Your message here..." />
                  </div>
                  
                  <button disabled={status === 'sending'} type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
