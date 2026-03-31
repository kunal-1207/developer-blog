'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Palette } from 'lucide-react';

const COLORS = [
    { name: 'Blue', hex: '#3b82f6', hexDark: '#2563eb' }, // bg-blue-500 / bg-blue-600
    { name: 'Purple', hex: '#a855f7', hexDark: '#9333ea' }, // bg-purple-500 / bg-purple-600
    { name: 'Emerald', hex: '#10b981', hexDark: '#059669' }, // bg-emerald-500 / bg-emerald-600
    { name: 'Rose', hex: '#f43f5e', hexDark: '#e11d48' }, // bg-rose-500 / bg-rose-600
    { name: 'Amber', hex: '#f59e0b', hexDark: '#d97706' }, // bg-amber-500 / bg-amber-600
];

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeColor, setActiveColor] = React.useState('Blue');

  const changeAccentColor = (color: typeof COLORS[0]) => {
      setActiveColor(color.name);
      document.documentElement.style.setProperty('--color-blue-400', color.hex); // For dark mode highlights
      document.documentElement.style.setProperty('--color-blue-500', color.hex);
      document.documentElement.style.setProperty('--color-blue-600', color.hexDark);
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-[#202124] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-[101] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Settings size={18} /> Browser Settings
              </h2>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X size={16} className="text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Appearance */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <Palette size={14} /> Accent Color
                </h3>
                <div className="flex items-center gap-3">
                    {COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => changeAccentColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 `}
                            style={{ 
                                backgroundColor: color.hex, 
                                borderColor: activeColor === color.name ? '#fff' : 'transparent', 
                                outline: activeColor === color.name ? `2px solid ${color.hex}` : 'none' 
                            }}
                            title={color.name}
                        />
                    ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-slate-700 dark:text-slate-300">Smooth Scrolling</span>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                          <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-5 rounded-full bg-blue-500 cursor-pointer"></label>
                      </div>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-slate-700 dark:text-slate-300">Show Bookmarks Bar</span>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle2" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                          <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-5 rounded-full bg-blue-500 cursor-pointer"></label>
                      </div>
                  </label>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
