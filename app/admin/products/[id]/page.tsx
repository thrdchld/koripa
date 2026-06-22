'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit2,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  Target,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  FileText
} from 'lucide-react';

const dummyProducts: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Rak Sepatu Lipat Portable Multi-Layer',
    slug: 'rak-sepatu-lipat-portable',
    category: 'Rumah Tangga',
    subcategory: 'Penyimpanan',
    status: 'published',
    short_description: 'Rak sepatu lipat portable hemat tempat untuk merapikan sepatu Anda.',
    long_description: 'Rak sepatu minimalis terbuat dari bahan plastik premium kokoh yang dapat dilipat saat tidak digunakan. Sangat praktis untuk anak kos atau rumah minimalis.',
    thumbnail_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
    links: [
      { id: '1', marketplace: 'shopee', seller_name: 'Toko Makmur Jaya', url: 'https://shopee.co.id/rak-sepatu-lipat-portable-i.12345.6789', price: 89000, discount: '10', rating: '4.8', sold: 1240, is_primary: true }
    ],
    ai: {
      target_audience: 'Anak Kos, Keluarga Muda, Pemilik Apartemen Kecil',
      problem_summary: 'Sepatu berantakan di depan pintu dan menghemat ruang di apartemen sempit.',
      hooks: [
        'Anak kos wajib punya ini sih biar kamar nggak keliatan sumpek!',
        'Solusi rak sepatu estetik murah meriah nggak makan tempat.',
        'Spill barang murah berfaedah penata sepatu berantakan.'
      ],
      angles: [
        'Before After Kamar Rapi',
        'Space Saving Hack',
        'Budget Friendly Room Deco'
      ],
      content_ideas: [
        { title: 'Makeover Teras Depan', description: 'Video durasi 15 detik menunjukkan merapikan 10 pasang sepatu berantakan ke dalam rak lipat.' },
        { title: 'ASMR Melipat Rak Sepatu', description: 'Video memuaskan melipat dan membuka rak sepatu dengan transisi musik upbeat.' }
      ],
      visual_recommendation: 'Tunjukkan proses melipat dan membuka rak sepatu dalam satu gerakan cepat (transisi cepat).',
      affiliate_reason: 'Komisi tinggi, konversi besar karena visual produk sangat memuaskan (satisfying) saat dilipat.',
      score_visual: 9.0,
      score_problem: 8.0,
      score_impulse: 9.0,
      score_final: 8.7
    }
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const product = dummyProducts[id] || dummyProducts['1'];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/products')}
            className="w-9 h-9 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
              <span className="font-mono bg-zinc-100 dark:bg-zinc-850 px-1.5 py-0.5 rounded text-[10px]">
                /{product.slug}
              </span>
              <span>•</span>
              <span className="font-semibold text-zinc-650">{product.category}</span>
              <span>•</span>
              <span className="text-zinc-500">{product.subcategory}</span>
            </div>
          </div>
        </div>

        <Link
          href={`/admin/products/${product.id}/edit`}
          className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-colors self-start sm:self-auto shadow-sm"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Edit Detail
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left Side: Product Detail and Links */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Info */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-zinc-150 dark:border-zinc-850 pb-4">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">Informasi Produk</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border border-zinc-200/30">
                  <img
                    src={product.thumbnail_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Deskripsi Singkat</span>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 leading-relaxed">
                    {product.short_description}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Spesifikasi Lengkap</span>
                  <p className="text-xs text-zinc-650 dark:text-zinc-400 mt-1 leading-relaxed whitespace-pre-line">
                    {product.long_description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-150 dark:border-zinc-850 pb-4">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">Link Marketplace</h2>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-850">
              {product.links.map((link: any) => (
                <div key={link.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                        {link.marketplace}
                      </span>
                      {link.is_primary && (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20 px-1.5 py-0.5 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 truncate max-w-[300px] font-mono">{link.url}</p>
                  </div>
                  <div className="flex items-center gap-6 self-end sm:self-auto">
                    <div className="text-right text-xs">
                      <span className="text-[10px] text-zinc-450 block">Harga</span>
                      <span className="font-bold text-zinc-950 dark:text-zinc-50 font-mono">Rp {link.price.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-[10px] text-zinc-450 block">Rating / Terjual</span>
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">{link.rating} ★ / {link.sold.toLocaleString('id-ID')}</span>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 flex items-center justify-center text-zinc-500 hover:text-zinc-850"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: AI Analytics */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Score Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-zinc-150 dark:border-zinc-850 pb-4">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">Affiliate Scoring</h2>
            </div>

            <div className="flex items-center justify-center py-4 bg-zinc-50 dark:bg-zinc-950/20 rounded-2xl border border-zinc-200/10">
              <div className="text-center">
                <span className="text-4xl font-extrabold text-amber-500 font-mono">{product.ai.score_final.toFixed(1)}</span>
                <span className="text-xs font-semibold text-zinc-400 block mt-1 uppercase tracking-wider">Overall Potential</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Visual Appeal</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 font-mono">{product.ai.score_visual.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Problem Solving</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 font-mono">{product.ai.score_problem.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium">Impulse Buy Potential</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 font-mono">{product.ai.score_impulse.toFixed(1)}/10</span>
              </div>
            </div>
          </div>

          {/* AI Metadata Details */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm space-y-5 text-xs">
            <div className="flex items-center gap-2 border-b border-zinc-150 dark:border-zinc-850 pb-4">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">AI Target & Context</h2>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-zinc-400" />
                  Target Audience
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 mt-1 font-medium">{product.ai.target_audience}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-zinc-400" />
                  Masalah yang Diselesaikan
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 mt-1 leading-relaxed">{product.ai.problem_summary}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase block mb-1.5">Hooks Promosi</span>
                <ul className="space-y-2">
                  {product.ai.hooks.map((hook: string, idx: number) => (
                    <li key={idx} className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-850 text-zinc-650 dark:text-zinc-300 relative pl-7">
                      <span className="absolute left-2.5 top-2.5 w-3.5 h-3.5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[9px]">
                        {idx + 1}
                      </span>
                      {hook}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
