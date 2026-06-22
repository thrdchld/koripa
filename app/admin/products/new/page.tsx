'use client';

import React from 'react';
import ProductForm from '@/features/products/components/product-form';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-55">
          Tambah Produk Baru
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Isi detail informasi di bawah ini untuk membuat data produk baru secara manual.
        </p>
      </div>
      
      <ProductForm />
    </div>
  );
}
