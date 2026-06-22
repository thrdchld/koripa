'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/features/products/components/product-form';

// Dummy lookup data
const dummyProducts: Record<string, any> = {
  '1': {
    name: 'Rak Sepatu Lipat Portable Multi-Layer',
    slug: 'rak-sepatu-lipat-portable',
    category: 'Rumah Tangga',
    subcategory: 'Penyimpanan',
    status: 'published',
    short_description: 'Rak sepatu lipat portable hemat tempat untuk merapikan sepatu Anda.',
    long_description: 'Rak sepatu minimalis terbuat dari bahan plastik premium kokoh yang dapat dilipat saat tidak digunakan. Sangat praktis untuk anak kos atau rumah minimalis.',
    thumbnail_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
    links: [
      { id: '1', marketplace: 'shopee', seller_name: 'Toko Makmur Jaya', url: 'https://shopee.co.id/rak-sepatu-lipat-portable-i.12345.6789', price: '89000', discount: '10', rating: '4.8', sold: '1240', is_primary: true }
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
        { title: 'Makeover Teras Depan', description: 'Video durasi 15 detik menunjukkan merapikan 10 pasang sepatu berantakan ke dalam rak lipat.' }
      ],
      visual_recommendation: 'Tunjukkan proses melipat dan membuka rak sepatu dalam satu gerakan cepat (transisi cepat).',
      affiliate_reason: 'Komisi tinggi, konversi besar karena visual produk sangat memuaskan (satisfying) saat dilipat.',
      score_visual: 9,
      score_problem: 8,
      score_impulse: 9
    }
  },
  '2': {
    name: 'Sapu Wiper Karet Silicon Magic Broom',
    slug: 'sapu-wiper-karet-silicon',
    category: 'Rumah Tangga',
    subcategory: 'Alat Pembersih',
    status: 'published',
    short_description: 'Sapu wiper karet serbaguna pembersih air dan debu lantai.',
    long_description: 'Sapu inovasi baru dengan ujung karet silikon tebal yang ampuh membersihkan genangan air, minyak, rambut, dan debu halus tanpa meninggalkan bekas.',
    thumbnail_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
    links: [
      { id: '1', marketplace: 'shopee', seller_name: 'Super Cleaning Official', url: 'https://shopee.co.id/sapu-wiper-karet-silicon-i.54321.0987', price: '35000', discount: '15', rating: '4.9', sold: '3450', is_primary: true }
    ],
    ai: {
      target_audience: 'Ibu Rumah Tangga, Asisten Rumah Tangga, Pemilik Cafe',
      problem_summary: 'Sapu biasa tidak efektif menyapu genangan air di lantai kamar mandi atau dapur.',
      hooks: [
        'Sapu konvensional buang aja, ganti pake sapu karet ajaib ini!',
        'Cara nyapu air di lantai kamar mandi beres dalam 5 detik.',
        'Wajib punya sapu ini di dapur biar lantai bebas minyak.'
      ],
      angles: [
        'Problem-Solution lantai basah',
        'Cleaning Aesthetic ASMR',
        'Life Hack Sapu Serbaguna'
      ],
      content_ideas: [
        { title: 'ASMR Bersihin Lantai Basah', description: 'Tunjukkan sapu wiper menyeret air di lantai kamar mandi dengan suara sruut sruut yang memuaskan.' }
      ],
      visual_recommendation: 'Close-up karet silikon menyeret air kotor dalam sekali usap.',
      affiliate_reason: 'Harga murah di bawah 50rb sehingga sangat mudah memicu impulse buying.',
      score_visual: 8,
      score_problem: 10,
      score_impulse: 9
    }
  }
};

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const productData = dummyProducts[id] || dummyProducts['1'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-55">
          Edit Produk: {productData.name}
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Ubah detail produk, link marketplace, atau sesuaikan deskripsi AI metadata di bawah ini.
        </p>
      </div>
      
      <ProductForm productId={id} initialData={productData} />
    </div>
  );
}
