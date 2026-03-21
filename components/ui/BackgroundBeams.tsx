"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 h-full w-full pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
        className="h-full w-full opacity-[0.03] dark:opacity-[0.05]"
      >
        <path
          d="M-100 900L1440 -100M-100 -100L1440 900M720 -100V900M-100 450H1440"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="720" cy="450" r="1" fill="currentColor">
          <animate
            attributeName="r"
            values="1;2000"
            dur="20s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0"
            dur="20s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};
