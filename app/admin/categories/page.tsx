'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Layers, FolderPlus } from 'lucide-react';

const initialCategories = [
  { id: '1', name: 'Rumah Tangga', slug: 'rumah-tangga', subCount: 4, desc: 'Perabotan, alat pembersih, dan penyimpanan rumah.' },
  { id: '2', name: 'Elektronik', slug: 'elektronik', subCount: 4, desc: 'Gadget, smart home, penunjang kerja, dan peralatan dapur listrik.' },
  { id: '3', name: 'Fashion', slug: 'fashion', subCount: 4, desc: 'Pakaian pria, wanita, anak-anak, dan aksesoris sandang.' },
];

export default function CategoryPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newCat = {
      id: Date.now().toString(),
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      subCount: 0,
      desc
    };
    setCategories([...categories, newCat]);
    setName('');
    setDesc('');
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Category Management
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Kelola kategori produk utama untuk pengelompokan penelusuran.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Add Category Form */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm self-start">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <FolderPlus className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Tambah Kategori</h2>
          </div>
          
          <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-600">Nama Kategori</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Kecantikan"
                className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs text-zinc-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-600">Deskripsi</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Keterangan singkat tentang kategori ini..."
                className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs min-h-[60px]"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 w-full h-9 rounded-lg bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:hover:bg-zinc-100 dark:text-zinc-950 font-bold"
            >
              <Plus className="w-4 h-4" />
              Simpan
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Deskripsi</th>
                    <th className="p-4 text-center">Sub-Kategori</th>
                    <th className="p-4 w-16 text-center">Hapus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 text-sm">
                  {categories.map((c) => (
                    <tr key={c.id} className="hover:bg-zinc-50/30 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">
                            {c.name}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            /{c.slug}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-zinc-550 dark:text-zinc-400 max-w-xs truncate">
                        {c.desc}
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400">
                          <Layers className="w-3.5 h-3.5" />
                          {c.subCount} Subs
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="w-8 h-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-colors"
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
