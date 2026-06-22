import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="w-full p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 space-y-4 animate-pulse">
      {/* Thumbnail Aspect Ratio Placeholder */}
      <div className="w-full aspect-video rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      
      {/* Title Lines */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3.5 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Meta tags lines */}
      <div className="flex gap-2 pt-2">
        <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-6 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Button Placeholder */}
      <div className="h-10 w-full rounded-xl bg-zinc-250 dark:bg-zinc-800 pt-2" />
    </div>
  );
}
