'use client';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      <section className="space-y-6 max-w-2xl">
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-3/4" />
        <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-5/6" />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden h-96">
            <div className="h-48 bg-slate-200 dark:bg-slate-800 w-full" />
            <div className="p-6 space-y-4">
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/4" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4" />
                <div className="space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-full" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-5/6" />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
