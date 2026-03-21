"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ReadingProgress = () => {
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

    window.addEventListener("scroll", updateScrollCompletion);

    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[100] h-1 w-full bg-slate-200/20 dark:bg-slate-800/20 backdrop-blur-sm"
    >
      <div
        className={cn(
          "h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]",
        )}
        style={{ width: `${completion}%` }}
      />
    </div>
  );
};
