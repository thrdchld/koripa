import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Terjadi Masalah Sistem',
  description = 'Gagal memuat data dari server. Silakan periksa koneksi internet Anda dan coba lagi.',
  onRetry
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 lg:p-12 rounded-2xl border border-rose-100 dark:border-rose-950/20 bg-rose-50/10 dark:bg-rose-950/5 min-h-[300px]">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
        {title}
      </h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-colors active:scale-98"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Coba Lagi
        </button>
      )}
    </div>
  );
}
