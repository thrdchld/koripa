import React from 'react';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<any>;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'Data Tidak Ditemukan',
  description = 'Maaf, data yang Anda cari tidak tersedia atau belum ditambahkan.',
  icon: Icon = FileQuestion,
  actionText,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 lg:p-12 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/10 min-h-[300px]">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-850 text-zinc-400 dark:text-zinc-550 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
        {title}
      </h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="flex items-center justify-center h-10 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:hover:bg-zinc-100 dark:text-zinc-950 font-semibold text-xs transition-colors active:scale-98"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
