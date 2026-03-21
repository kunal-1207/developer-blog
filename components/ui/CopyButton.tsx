"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className={cn(
        "absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white p-1.5 transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900",
        isCopied && "border-green-500 bg-green-500/10 dark:border-green-400 dark:bg-green-400/10"
      )}
      title="Copy code"
    >
      {isCopied ? (
        <Check className="h-full w-full text-green-500 dark:text-green-400" />
      ) : (
        <Copy className="h-full w-full text-slate-500 dark:text-slate-400" />
      )}
    </button>
  );
};
