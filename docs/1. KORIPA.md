# KORIPA

## Komitan Riset Produk Affiliate

Version: 1.0

---

# VISI

KORIPA adalah Knowledge Base Produk Affiliate yang membantu affiliate marketer menemukan produk, memahami target pasar, menemukan masalah yang diselesaikan produk, mendapatkan ide konten, dan membuat keputusan promosi lebih cepat.

KORIPA bukan marketplace.

KORIPA bukan chatbot AI.

KORIPA bukan katalog produk biasa.

KORIPA adalah pusat riset produk affiliate yang menggabungkan produk, insight, ide konten, dan pengetahuan pemasaran dalam satu tempat.

---

# TUJUAN UTAMA

Membantu creator dan affiliate marketer menjawab pertanyaan:

* Produk apa yang layak dipromosikan?
* Produk ini menyelesaikan masalah apa?
* Siapa target pasarnya?
* Hook apa yang bisa digunakan?
* Angle konten apa yang cocok?
* Produk serupa apa yang bisa dipromosikan?

Tujuan utama KORIPA adalah mempercepat proses riset produk affiliate.

---

# TARGET PENGGUNA

* Shopee Affiliate
* TikTok Affiliate
* UGC Creator
* Content Creator
* Pemula Affiliate
* Affiliate Berpengalaman

Pengguna utama bukan developer.

Pengguna utama bukan orang teknis.

Seluruh desain harus dibuat agar dapat digunakan oleh orang awam.

---

# FILOSOFI PRODUK

User First.

Semua keputusan desain harus mengutamakan kemudahan penggunaan.

Jika ada dua solusi:

* Solusi yang lebih canggih
* Solusi yang lebih mudah dipahami

Pilih solusi yang lebih mudah dipahami.

---

# POSISI PRODUK

KORIPA bukan katalog produk.

KORIPA adalah knowledge base affiliate.

Setiap produk harus memiliki:

* Informasi produk
* Insight
* Target audience
* Masalah yang diselesaikan
* Hook
* Angle
* Ide konten
* Potensi affiliate

Nilai utama KORIPA bukan link marketplace.

Nilai utama KORIPA adalah insight.

---

# ARSITEKTUR UMUM

Frontend dan Backend:

* Next.js
* Hugging Face Docker Space

Database:

* Supabase PostgreSQL

Storage:

* Supabase Storage

Authentication:

* Supabase Auth

Admin Login:

* Google Login
* Email Whitelist

---

# MARKETPLACE

Arsitektur harus mendukung banyak marketplace.

Versi awal:

* Shopee

Masa depan:

* Tokopedia
* TikTok Shop
* Lazada

Jangan membuat struktur database yang mengikat aplikasi ke satu marketplace.

Gunakan Marketplace Adapter.

---

# USER PUBLIK

Tidak perlu login.

Pengguna dapat:

* Melihat produk
* Mencari produk
* Mencari berdasarkan masalah
* Mencari berdasarkan kategori
* Mencari berdasarkan tag
* Membaca insight
* Membaca hook
* Membaca angle
* Membaca ide konten
* Membuka link marketplace
* Menyimpan bookmark lokal browser
* Mengirim laporan produk bermasalah
* Mengusulkan produk baru

---

# BOOKMARK

Bookmark menggunakan Local Storage.

Tidak menggunakan akun.

Harus ada informasi yang jelas:

"Bookmark hanya tersimpan di browser dan perangkat ini."

---

# ADMIN

Admin dapat:

* Import produk
* Bulk import
* Review produk
* Publish produk
* Archive produk
* Edit metadata
* Re-analyze produk
* Mengelola kategori
* Mengelola tag
* Mengelola koleksi

---

# PRODUCT LIFECYCLE

Draft

Review

Published

Archived

Deleted (Soft Delete)

Jangan pernah melakukan hard delete.

---

# AI

AI hanya digunakan oleh admin.

AI tidak digunakan sebagai chatbot untuk user.

AI digunakan untuk:

* Klasifikasi
* Tagging
* Insight
* Hook
* Angle
* Ide konten
* Duplicate detection
* Affiliate scoring

---

# AI ROUTER

Urutan prioritas:

1. Groq
2. Gemini
3. OpenRouter
4. 9Router

Fallback otomatis.

Jika AI gagal:

Produk tetap dapat disimpan secara manual.

AI tidak boleh menjadi single point of failure.

---

# AI OUTPUT

AI menghasilkan:

Kategori

Subkategori

Tag

Target Audience

Masalah yang Diselesaikan

Hook

Angle

Ide Konten

Visual Recommendation

Affiliate Potential Score

Semua hasil AI dapat diedit admin.

---

# SEO

SEO adalah fitur inti.

Setiap:

* Produk
* Kategori
* Koleksi
* Masalah
* Insight

harus memiliki halaman publik sendiri.

Aplikasi harus mendukung:

* Sitemap
* Canonical URL
* Open Graph
* Structured Data
* Metadata SEO

Sejak awal.

---

# HOMEPAGE

Urutan prioritas:

1. Hero Search
2. Trending
3. Naik Daun
4. Baru Ditambahkan
5. Cari Berdasarkan Masalah
6. Kategori
7. Koleksi Pilihan
8. Insight Terbaru

---

# PENCARIAN

Pencarian tidak hanya berdasarkan nama produk.

Pencarian juga harus bekerja untuk:

* Masalah
* Tag
* Target Audience
* Insight
* Kategori

Contoh:

"anak kos"

"rumah berantakan"

"bawah 100 ribu"

"dapur kecil"

---

# INSIGHT ARTICLES

KORIPA mendukung artikel insight.

Contoh:

* Produk Affiliate untuk Anak Kos
* Produk Rumah Tangga yang Mudah Viral
* Produk Bawah 50 Ribu dengan Potensi Tinggi

Tujuan:

* SEO
* Discovery
* Internal Linking

---

# UI UX MANIFESTO

Referensi desain:

* Pinterest
* Product Hunt
* Perplexity
* Airbnb
* Notion
* Airtable
* Linear
* YouTube

Jangan menciptakan pola navigasi baru jika pola standar industri sudah tersedia.

---

# MOBILE FIRST

Desain dimulai dari mobile.

Kemudian:

* Tablet
* Desktop

Bukan sebaliknya.

---

# RESPONSIVE

Semua halaman harus bekerja dengan baik pada:

* Mobile
* Tablet
* Laptop
* Desktop besar

Tidak boleh ada:

* Overflow
* Horizontal scroll yang tidak disengaja
* Elemen bertumpuk
* Teks terpotong
* Layout rusak

---

# ACCESSIBILITY

Minimal WCAG AA.

Kontras harus jelas.

Keyboard navigation harus berfungsi.

Focus state harus terlihat.

---

# LOADING STATE

Gunakan skeleton loading.

Jangan menggunakan halaman kosong dengan tulisan loading.

---

# EMPTY STATE

Semua halaman harus memiliki empty state yang jelas.

Pengguna harus selalu tahu apa yang harus dilakukan selanjutnya.

---

# ERROR STATE

Pesan error harus mudah dipahami.

Jangan menampilkan error teknis kepada pengguna umum.

---

# DESIGN SYSTEM

Wajib memiliki:

* Typography Scale
* Spacing Scale
* Color Tokens
* Component Library
* Icon System

Konsistensi lebih penting daripada kreativitas visual.

---

# QUALITY GATE

Sebuah fitur tidak dianggap selesai jika belum lolos:

* Mobile Test
* Tablet Test
* Desktop Test
* Accessibility Test
* Loading Test
* Empty State Test
* Error State Test
* Keyboard Navigation Test
* SEO Test

---

# TUJUAN AKHIR

Membangun platform riset produk affiliate yang cepat, mudah digunakan, responsif, mudah dipelajari, dan dapat berkembang selama bertahun-tahun tanpa perlu perubahan arsitektur besar.
