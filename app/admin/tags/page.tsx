'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Tag, Search } from 'lucide-react';

const initialTags = [
  { id: '1', name: 'viral', slug: 'viral', desc: 'Produk-produk yang sedang tren di TikTok/Instagram.' },
  { id: '2', name: 'anak-kos', slug: 'anak-kos', desc: 'Peralatan mini, hemat ruang, dan murah untuk kos-kosan.' },
  { id: '3', name: 'budget-friendly', slug: 'budget-friendly', desc: 'Produk penata rumah murah di bawah 50 ribu.' },
  { id: '4', name: 'minimalis', slug: 'minimalis', desc: 'Perabotan bertema warna netral dan hemat tempat.' },
];

export default function TagPage() {
  const [tags, setProducts] = useState(initialTags);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [search, setSearch] = useState('');

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newTag = {
      id: Date.now().toString(),
      name: name.toLowerCase().replace(/\s+/g, '-'),
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      desc
    };
    setProducts([...tags, newTag]);
    setName('');
    setDesc('');
  };

  const handleDelete = (id: string) => {
    setProducts(tags.filter(t => t.id !== id));
  };

  const filteredTags = tags.filter(t => t.name.includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-55">
          Tag Management
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Kelola tag label produk untuk mempermudah pencarian berbasis topik atau tren.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Add Tag Form */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm self-start">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <Plus className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Tambah Tag Baru</h2>
          </div>
          
          <form onSubmit={handleAddTag} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-650 dark:text-zinc-400">Nama Tag</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: rekomendasi-shopee"
                className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-650 dark:text-zinc-400">Deskripsi</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Keterangan tren tag..."
                className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs min-h-[60px]"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 w-full h-9 rounded-lg bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:hover:bg-zinc-100 dark:text-zinc-950 font-bold"
            >
              <Plus className="w-4 h-4" />
              Simpan Tag
            </button>
          </form>
        </div>

        {/* Tags List */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search bar */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-450" />
            <input
              type="text"
              placeholder="Cari tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:outline-none"
            />
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="p-4">Tag</th>
                    <th className="p-4">Deskripsi</th>
                    <th className="p-4 w-16 text-center">Hapus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 text-sm">
                  {filteredTags.map((t) => (
                    <tr key={t.id} className="hover:bg-zinc-50/30 transition-colors">
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-350">
                          <Tag className="w-3 h-3" />
                          {t.name}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-zinc-550 dark:text-zinc-400">
                        {t.desc}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="w-8 h-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-450 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
