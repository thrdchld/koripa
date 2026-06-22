'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Link as LinkIcon,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface ProductFormProps {
  productId?: string;
  initialData?: any;
}

const categories = {
  'Rumah Tangga': ['Penyimpanan', 'Dapur', 'Alat Pembersih', 'Kamar Tidur'],
  'Elektronik': ['Dapur', 'Kamar Tidur', 'Gadget', 'Audio'],
  'Fashion': ['Pria', 'Wanita', 'Anak-anak', 'Aksesoris'],
};

export default function ProductForm({ productId, initialData }: ProductFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'info' | 'links' | 'ai'>('info');

  // Form states
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [shortDesc, setShortDesc] = useState(initialData?.short_description || '');
  const [longDesc, setLongDesc] = useState(initialData?.long_description || '');
  const [category, setCategory] = useState(initialData?.category || 'Rumah Tangga');
  const [subcategory, setSubcategory] = useState(initialData?.subcategory || 'Penyimpanan');
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url || '');
  const [status, setStatus] = useState(initialData?.status || 'draft');

  // Links state
  const [links, setLinks] = useState<any[]>(initialData?.links || [
    { id: '1', marketplace: 'shopee', seller_name: '', url: '', price: '', discount: '', rating: '', sold: '', is_primary: true }
  ]);

  // AI Metadata states
  const [targetAudience, setTargetAudience] = useState(initialData?.ai?.target_audience || '');
  const [problemSummary, setProblemSummary] = useState(initialData?.ai?.problem_summary || '');
  const [hooks, setHooks] = useState<string[]>(initialData?.ai?.hooks || ['', '', '']);
  const [angles, setAngles] = useState<string[]>(initialData?.ai?.angles || ['', '', '']);
  const [contentIdeas, setContentIdeas] = useState<any[]>(initialData?.ai?.content_ideas || [
    { title: '', description: '' }
  ]);
  const [visualRec, setVisualRec] = useState(initialData?.ai?.visual_recommendation || '');
  const [affiliateReason, setAffiliateReason] = useState(initialData?.ai?.affiliate_reason || '');
  
  const [scoreVisual, setScoreVisual] = useState(initialData?.ai?.score_visual || 8);
  const [scoreProblem, setScoreProblem] = useState(initialData?.ai?.score_problem || 8);
  const [scoreImpulse, setScoreImpulse] = useState(initialData?.ai?.score_impulse || 8);

  // Auto-generate slug from name
  useEffect(() => {
    if (!productId && name) {
      setSlug(name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-'));
    }
  }, [name, productId]);

  const handleAddLink = () => {
    setLinks([...links, { id: Date.now().toString(), marketplace: 'shopee', seller_name: '', url: '', price: '', discount: '', rating: '', sold: '', is_primary: false }]);
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const handleLinkChange = (id: string, field: string, value: any) => {
    setLinks(links.map(l => {
      if (l.id === id) {
        if (field === 'is_primary' && value === true) {
          // Uncheck all other primaries
          return { ...l, [field]: value };
        }
        return { ...l, [field]: value };
      }
      if (field === 'is_primary' && value === true) {
        return { ...l, is_primary: false };
      }
      return l;
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    alert(`Produk berhasil ${productId ? 'diperbarui' : 'disimpan'}!`);
    router.push('/admin/products');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {/* Header buttons */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="w-8 h-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Kembali ke daftar produk
          </span>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:hover:bg-zinc-100 dark:text-zinc-950 font-bold text-xs transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          Simpan Produk
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200/50 dark:border-zinc-800/50">
        <button
          type="button"
          onClick={() => setActiveTab('info')}
          className={`h-11 px-4 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'info'
              ? 'border-primary text-primary'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          1. Informasi Produk
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('links')}
          className={`h-11 px-4 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'links'
              ? 'border-primary text-primary'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          2. Link Marketplace
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`h-11 px-4 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'ai'
              ? 'border-primary text-primary'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          3. AI Metadata & Scoring
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 shadow-sm">
        
        {/* Tab 1: Info */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                  Nama Produk <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Rak Sepatu Lipat Portable Multi-Layer"
                  className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-zinc-800 dark:text-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                  Product Slug (URL) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="rak-sepatu-lipat-portable"
                  className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-zinc-850 dark:text-zinc-200 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory(categories[e.target.value as keyof typeof categories][0]);
                  }}
                  className="w-full h-10 px-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm"
                >
                  <option value="Rumah Tangga">Rumah Tangga</option>
                  <option value="Elektronik">Elektronik</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                  Sub-Kategori
                </label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full h-10 px-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm"
                >
                  {categories[category as keyof typeof categories].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                  Status Penerbitan
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-10 px-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="review">Perlu Review</option>
                  <option value="published">Published (Live)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                Thumbnail Gambar URL
              </label>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... atau Supabase Storage path"
                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                Deskripsi Singkat (SEO snippet)
              </label>
              <textarea
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Deskripsi singkat max 160 karakter untuk meta SEO..."
                maxLength={160}
                className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm min-h-[60px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                Deskripsi Lengkap Produk
              </label>
              <textarea
                value={longDesc}
                onChange={(e) => setLongDesc(e.target.value)}
                placeholder="Spesifikasi lengkap, bahan, ukuran produk..."
                className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm min-h-[120px]"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Links */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-550 dark:text-zinc-400">
                Link Marketplace Terdaftar ({links.length})
              </span>
              <button
                type="button"
                onClick={handleAddLink}
                className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 font-semibold text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Link
              </button>
            </div>

            <div className="space-y-4 divide-y divide-zinc-100 dark:divide-zinc-850">
              {links.map((link, idx) => (
                <div key={link.id} className="pt-4 first:pt-0 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </div>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase">
                        {link.marketplace} Link
                      </span>
                    </div>
                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(link.id)}
                        className="w-8 h-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500">Marketplace</label>
                      <select
                        value={link.marketplace}
                        onChange={(e) => handleLinkChange(link.id, 'marketplace', e.target.value)}
                        className="w-full h-9 px-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs"
                      >
                        <option value="shopee">Shopee</option>
                        <option value="tokopedia">Tokopedia</option>
                        <option value="tiktok_shop">TikTok Shop</option>
                        <option value="lazada">Lazada</option>
                      </select>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-bold text-zinc-500">Product URL</label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                        placeholder="https://shopee.co.id/product/..."
                        className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500">Harga (Rp)</label>
                      <input
                        type="number"
                        value={link.price}
                        onChange={(e) => handleLinkChange(link.id, 'price', e.target.value)}
                        placeholder="89000"
                        className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500">Seller Name</label>
                      <input
                        type="text"
                        value={link.seller_name}
                        onChange={(e) => handleLinkChange(link.id, 'seller_name', e.target.value)}
                        placeholder="Toko Sejahtera"
                        className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500">Rating Toko</label>
                      <input
                        type="number"
                        step="0.1"
                        value={link.rating}
                        onChange={(e) => handleLinkChange(link.id, 'rating', e.target.value)}
                        placeholder="4.8"
                        className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs"
                      />
                    </div>

                    <div className="space-y-1 flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer h-9 select-none">
                        <input
                          type="checkbox"
                          checked={link.is_primary}
                          onChange={(e) => handleLinkChange(link.id, 'is_primary', e.target.checked)}
                          className="rounded border-zinc-300 text-primary w-4 h-4"
                        />
                        <span className="text-xs font-bold text-zinc-650">Link Utama (Primary)</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: AI Metadata */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                AI Enrichment Metadata
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                  Target Pasar (Audience)
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Contoh: Anak kos, ibu rumah tangga muda, pekerja WFH"
                  className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                  Masalah yang Diselesaikan (Problem Summary)
                </label>
                <textarea
                  value={problemSummary}
                  onChange={(e) => setProblemSummary(e.target.value)}
                  placeholder="Membantu menata kabel yang berserakan agar rapi..."
                  className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm min-h-[60px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400 flex items-center justify-between">
                    Visual Appeal Score
                    <span className="text-[10px] text-zinc-400">({scoreVisual}/10)</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={scoreVisual}
                    onChange={(e) => setScoreVisual(Number(e.target.value))}
                    className="w-full accent-primary h-8"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400 flex items-center justify-between">
                    Problem Solver Score
                    <span className="text-[10px] text-zinc-400">({scoreProblem}/10)</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={scoreProblem}
                    onChange={(e) => setScoreProblem(Number(e.target.value))}
                    className="w-full accent-primary h-8"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400 flex items-center justify-between">
                    Impulse Buy Score
                    <span className="text-[10px] text-zinc-400">({scoreImpulse}/10)</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={scoreImpulse}
                    onChange={(e) => setScoreImpulse(Number(e.target.value))}
                    className="w-full accent-primary h-8"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                  Daftar Hooks Promosi (JSONB List)
                </label>
                {hooks.map((hook, i) => (
                  <input
                    key={i}
                    type="text"
                    value={hook}
                    onChange={(e) => {
                      const newHooks = [...hooks];
                      newHooks[i] = e.target.value;
                      setHooks(newHooks);
                    }}
                    placeholder={`Hook #${i + 1}`}
                    className="w-full h-9 px-3 rounded-lg border border-zinc-150 dark:border-zinc-800 bg-transparent text-xs"
                  />
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-650 dark:text-zinc-400">
                  Angles Konten (JSONB List)
                </label>
                {angles.map((angle, i) => (
                  <input
                    key={i}
                    type="text"
                    value={angle}
                    onChange={(e) => {
                      const newAngles = [...angles];
                      newAngles[i] = e.target.value;
                      setAngles(newAngles);
                    }}
                    placeholder={`Angle #${i + 1} (Contoh: Before After, Problem-Solution)`}
                    className="w-full h-9 px-3 rounded-lg border border-zinc-150 dark:border-zinc-800 bg-transparent text-xs"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </form>
  );
}
