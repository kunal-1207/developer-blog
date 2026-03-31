'use client';

import React, { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    window.addEventListener('scroll', updateScrollCompletion);

    return () => {
      window.removeEventListener('scroll', updateScrollCompletion);
    };
  }, []);

  return (
    <div className="fixed top-[84px] left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-150 ease-out"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
