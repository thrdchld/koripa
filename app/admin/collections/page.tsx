'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit2, FolderHeart, CheckCircle, FileText, Image } from 'lucide-react';

const initialCollections = [
  { id: '1', title: 'Rekomendasi Perlengkapan Anak Kos', slug: 'produk-anak-kos', count: 12, isPublished: true, isFeatured: true, desc: 'Peralatan serbaguna berukuran minimalis yang wajib dimiliki anak kos.' },
  { id: '2', name: 'Produk Dekorasi Kamar Viral', title: 'Dekorasi Kamar Aesthetic Viral', slug: 'dekorasi-kamar-viral', count: 8, isPublished: true, isFeatured: false, desc: 'Barang-barang dekoratif estetis yang viral di TikTok.' },
  { id: '3', title: 'Peralatan Dapur Murah di Bawah 50 Ribu', slug: 'dapur-murah-bawah-50k', count: 18, isPublished: false, isFeatured: false, desc: 'Cetak telur, sapu silikon, dan perabot dapur murah meriah.' },
];

export default function CollectionsPage() {
  const [collections, setCollections] = useState(initialCollections);

  const handleDelete = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-55">
            Collections Management
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Kelola koleksi pilihan terkurasi untuk memicu discovery produk di halaman publik.
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert('Tambah Koleksi Baru (Dummy Action)')}
          className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:hover:bg-zinc-100 dark:text-zinc-950 font-bold text-xs transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Buat Koleksi
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((c) => (
          <div
            key={c.id}
            className="flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Cover Mock */}
            <div className="aspect-video bg-zinc-100 dark:bg-zinc-850 flex items-center justify-center text-zinc-400 relative border-b border-zinc-200/20">
              <Image className="w-8 h-8" />
              <div className="absolute top-3 left-3 flex gap-2">
                {c.isPublished ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450">
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-650 dark:bg-zinc-800 dark:text-zinc-400">
                    Draft
                  </span>
                )}
                {c.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-450">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                  {c.title}
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  /{c.slug}
                </span>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-850 pt-4 text-xs">
                <span className="font-bold text-zinc-600 dark:text-zinc-400">
                  {c.count} Produk
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('Edit Koleksi (Dummy Action)')}
                    className="w-8 h-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="w-8 h-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
