'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Archive,
  MoreVertical,
  CheckCircle,
  FileText,
  AlertCircle,
  FileArchive,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Tag
} from 'lucide-react';

// 1. DUMMY PRODUCTS DATA
const initialProducts = [
  { id: '1', name: 'Rak Sepatu Lipat Portable Multi-Layer', slug: 'rak-sepatu-lipat-portable', category: 'Rumah Tangga', subcategory: 'Penyimpanan', status: 'published', score: 8.5, price: 89000, sold: 1240, created: '2026-06-15' },
  { id: '2', name: 'Sapu Wiper Karet Silicon Magic Broom', slug: 'sapu-wiper-karet-silicon', category: 'Rumah Tangga', subcategory: 'Alat Pembersih', status: 'published', score: 9.0, price: 35000, sold: 3450, created: '2026-06-18' },
  { id: '3', name: 'Gantungan Baju Hanger Estetik Stainless Steel', slug: 'gantungan-baju-hanger-estetik', category: 'Rumah Tangga', subcategory: 'Kamar Tidur', status: 'review', score: 7.2, price: 45000, sold: 0, created: '2026-06-20' },
  { id: '4', name: 'Mini Blender Portable USB Juice Extractor', slug: 'mini-blender-portable-usb', category: 'Elektronik', subcategory: 'Dapur', status: 'draft', score: 8.0, price: 120000, sold: 0, created: '2026-06-21' },
  { id: '5', name: 'Kaos Polos Cotton Combed 30s Premium', slug: 'kaos-polos-cotton-combed', category: 'Fashion', subcategory: 'Pria', status: 'published', score: 6.8, price: 29000, sold: 8900, created: '2026-06-10' },
  { id: '6', name: 'Alat Cetakan Telur Ceplok Bulat Teflon', slug: 'alat-cetakan-telur-ceplok', category: 'Rumah Tangga', subcategory: 'Dapur', status: 'archived', score: 5.5, price: 12000, sold: 320, created: '2026-05-12' },
  { id: '7', name: 'Humidifier Diffuser Aroma Therapy LED', slug: 'humidifier-diffuser-aroma-therapy', category: 'Elektronik', subcategory: 'Kamar Tidur', status: 'published', score: 8.8, price: 75000, sold: 1450, created: '2026-06-14' },
];

export default function ProductListPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Filters & Search
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(x => x !== id));
    }
  };

  // Bulk Actions
  const handleBulkStatusChange = (newStatus: 'published' | 'draft' | 'archived' | 'deleted') => {
    if (newStatus === 'deleted') {
      setProducts(products.filter(p => !selectedIds.includes(p.id)));
    } else {
      setProducts(products.map(p => {
        if (selectedIds.includes(p.id)) {
          return { ...p, status: newStatus };
        }
        return p;
      }));
    }
    setSelectedIds([]);
  };

  // Single Action Triggers
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setActiveDropdown(null);
  };

  const handleArchiveProduct = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'archived' as const } : p));
    setActiveDropdown(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <CheckCircle className="w-3 h-3" />
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            <FileText className="w-3 h-3" />
            Draft
          </span>
        );
      case 'review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
            <AlertCircle className="w-3 h-3" />
            Review
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
            <FileArchive className="w-3 h-3" />
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return 'text-emerald-600 dark:text-emerald-400 font-bold';
    if (score >= 6.0) return 'text-blue-600 dark:text-blue-400 font-semibold';
    return 'text-zinc-500 dark:text-zinc-400';
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Products List
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Kelola data produk utama, status penerbitan, dan skor potensi afiliasi.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:hover:bg-zinc-100 dark:text-zinc-950 font-bold text-xs transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Produk
        </Link>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center flex-1">
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari produk atau slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-zinc-500">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 px-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs text-zinc-800 dark:text-zinc-250 focus:outline-none"
            >
              <option value="all">Semua Kategori</option>
              <option value="Rumah Tangga">Rumah Tangga</option>
              <option value="Elektronik">Elektronik</option>
              <option value="Fashion">Fashion</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs text-zinc-800 dark:text-zinc-255 focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-semibold text-zinc-500 mr-2">
              {selectedIds.length} terpilih:
            </span>
            <button
              onClick={() => handleBulkStatusChange('published')}
              className="h-8 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-emerald-600 dark:text-emerald-400 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold transition-colors"
            >
              Publish
            </button>
            <button
              onClick={() => handleBulkStatusChange('archived')}
              className="h-8 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold transition-colors"
            >
              Archive
            </button>
            <button
              onClick={() => handleBulkStatusChange('deleted')}
              className="h-8 px-3 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold transition-colors"
            >
              Hapus
            </button>
          </div>
        )}
      </div>

      {/* Products Table Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={filteredProducts.length > 0 && selectedIds.length === filteredProducts.length}
                    onChange={handleSelectAll}
                    className="rounded border-zinc-300 dark:border-zinc-700 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="p-4">Produk</th>
                <th className="p-4">Kategori / Sub</th>
                <th className="p-4">Status</th>
                <th className="p-4">Affiliate Score</th>
                <th className="p-4 text-center">Harga</th>
                <th className="p-4 text-center">Terjual</th>
                <th className="p-4 w-16 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 text-sm">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-zinc-450 dark:text-zinc-500">
                    Tidak ada produk yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-850/10 transition-colors">
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={(e) => handleSelectOne(product.id, e.target.checked)}
                        className="rounded border-zinc-300 dark:border-zinc-700 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5 max-w-sm">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="font-bold text-zinc-900 dark:text-zinc-150 hover:text-primary dark:hover:text-zinc-50 transition-colors truncate"
                        >
                          {product.name}
                        </Link>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                          /{product.slug}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5 text-xs">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {product.category}
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          {product.subcategory}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className={getScoreColor(product.score)}>
                          {product.score.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-medium font-mono text-xs">
                      Rp {product.price.toLocaleString('id-ID')}
                    </td>
                    <td className="p-4 text-center font-medium text-xs">
                      {product.sold.toLocaleString('id-ID')}
                    </td>
                    <td className="p-4 text-center relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                        className="w-8 h-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeDropdown === product.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveDropdown(null)}
                          />
                          <div className="absolute right-4 mt-1 w-36 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-lg p-1.5 z-20 text-left">
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="flex items-center gap-2 px-3 h-8 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              Edit Produk
                            </Link>
                            <button
                              onClick={() => handleArchiveProduct(product.id)}
                              className="flex items-center gap-2 px-3 h-8 w-full rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-left"
                            >
                              <Archive className="w-3.5 h-3.5" />
                              Archive
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="flex items-center gap-2 px-3 h-8 w-full rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-455 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-left"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Hapus
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
