# PROJECT STATUS

## Ringkasan Proyek

- **Nama proyek**: KORIPA (Komitan Riset Produk Affiliate)
- **Tujuan proyek**: Platform riset produk afiliasi berbasis AI untuk kurasi produk marketplace, analisis konten promosi (hooks, angles, visual recommendations), scoring produk, dan publikasi katalog SEO.
- **Target pengguna**: Tim kurator produk (kreator konten afiliasi) dan pengguna umum pencari produk afiliasi.
- **Status saat ini**: 
  - [x] Alpha (UI/UX Admin dan Database siap, tetapi logika backend scraper & AI masih placeholder/dummy)
  - [ ] Beta
  - [ ] Production

---

## Progress Keseluruhan

Persentase penyelesaian berdasarkan implementasi nyata di source code:

- **Frontend (Admin Dashboard)**: 75% (Dashboard, list produk, detail produk, form edit/create produk, kategori, tag, koleksi sudah terimplementasi secara responsif dan interaktif)
- **Frontend (Public Page)**: 5% (Masih menggunakan template default/boilerplate Next.js)
- **Backend (Scrapers, AI Router & Queue)**: 15% (Auth handler & Proxy Routing middleware selesai; adapter parser, queue worker, dan AI fallback router belum diimplementasikan)
- **Database**: 90% (Supabase migration script `20260622000000_init.sql` mendefinisikan 17 tabel dengan trigger, index, fungsi `is_active_admin` dan RLS policy lengkap)
- **Authentication**: 100% (OAuth Google login, whitelisting melalui table `admins`, dan session checking via proxy.ts middleware sudah fully functional)
- **Deployment**: 10% (Environment configuration `.env.local` siap, Hugging Face Docker configuration belum dideploy)

---

## Struktur Folder

Berikut struktur folder utama proyek:

```
/
├── app/                        # Next.js App Router Pages
│   ├── (public)/               # Halaman publik (katalog, detail produk, dll - masih boilerplate)
│   ├── admin/                  # Halaman admin dashboard (login, products, categories, dll)
│   │   ├── categories/         # Halaman manajemen kategori
│   │   ├── collections/        # Halaman manajemen koleksi produk
│   │   ├── login/              # Halaman login administrator
│   │   ├── products/           # Halaman daftar, tambah, edit, detail produk
│   │   └── tags/               # Halaman manajemen tag
│   └── auth/callback/          # Route handler redirect Google OAuth
├── components/                 # Global reusable UI components
│   ├── empty-state.tsx         # Loader state kosong
│   ├── error-state.tsx         # Loader state error
│   ├── skeleton-card.tsx       # Skeleton loading card
│   └── theme-provider.tsx      # Penyedia tema dark/light mode
├── docs/                       # Dokumentasi spesifikasi proyek
├── features/                   # Domain-driven business logic modules
│   └── products/
│       └── components/
│           └── product-form.tsx # Form produk admin (reusable)
├── services/                   # Global API wrappers
│   ├── supabase.service.ts     # Supabase Server-side Client
│   └── supabase-browser.service.ts # Supabase Client-side Client
├── supabase/                   # Supabase configuration & migrations
└── proxy.ts                    # Next.js Middleware/Proxy Routing
```

### Fungsi Masing-Masing Folder
- **`app/`**: Mengatur routing halaman Next.js, membedakan area publik dan area terproteksi admin (`app/admin/`).
- **`components/`**: Berisi komponen UI generik yang dapat digunakan di seluruh aplikasi (seperti loaders dan empty states).
- **`features/`**: Mengelompokkan kode berdasarkan domain bisnis (misalnya fitur produk ditempatkan di folder `features/products/`).
- **`services/`**: Menyediakan instance Supabase client yang terisolasi untuk client-side dan server-side agar kompatibel dengan Server Components Next.js.
- **`supabase/`**: Menyimpan skema migrasi database PostgreSQL Supabase.
- **`proxy.ts`**: Middleware global untuk intercept navigasi rute admin, memvalidasi sesi user, dan mencocokkan email dengan whitelist administrator.

---

## Fitur yang Sudah Selesai

### Gating Authentication & Whitelist Admin
- **Status**: ✅ Selesai
- **Deskripsi**: Autentikasi menggunakan OAuth Google Sign-in. Sistem membatasi hak akses masuk admin dengan memvalidasi email user terhadap tabel `admins` di Supabase. Sesi admin diamankan secara real-time melalui middleware.
- **File terkait**:
  - [proxy.ts](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/proxy.ts)
  - [app/auth/callback/route.ts](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/auth/callback/route.ts)
  - [app/admin/login/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/login/page.tsx)
  - [services/supabase.service.ts](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/services/supabase.service.ts)
  - [services/supabase-browser.service.ts](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/services/supabase-browser.service.ts)

### Database Schema & Security Policies
- **Status**: ✅ Selesai
- **Deskripsi**: Inisialisasi skema database mencakup 17 tabel utama untuk produk, tautan marketplace, metadata AI, koleksi, laporan, import antrian (queue), audit log, dan cache token AI. Dilengkapi trigger `updated_at` otomatis, index optimasi pencarian, serta Row Level Security (RLS) policies dengan fungsi pengecekan admin `is_active_admin()`.
- **File terkait**:
  - [supabase/migrations/20260622000000_init.sql](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/supabase/migrations/20260622000000_init.sql)

---

## Fitur Sebagian Selesai

### UI/UX Admin Dashboard & Product Management (Milestone 3)
- **Status**: ⚠️ Sebagian
- **Yang sudah ada**:
  - Struktur visual dashboard admin, daftar produk dengan search, multi-selection checkbox, status badges, dan detail affiliate score.
  - Halaman edit, tambah produk (`ProductForm`), manajemen kategori, tag, dan koleksi.
  - Semua interaksi UI (search, filters, penambahan item, edit tabs) berjalan lancar secara interaktif menggunakan state React.
- **Yang belum ada**:
  - Integrasi data asli dari Supabase. Data yang ditampilkan saat ini masih menggunakan array dummy lokal, dan operasi "Simpan Produk" masih berupa simulasi `alert()`.
- **File terkait**:
  - [app/admin/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/page.tsx)
  - [app/admin/products/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/products/page.tsx)
  - [app/admin/products/[id]/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/products/%5Bid%5D/page.tsx)
  - [features/products/components/product-form.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/features/products/components/product-form.tsx)
  - [app/admin/categories/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/categories/page.tsx)
  - [app/admin/tags/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/tags/page.tsx)
  - [app/admin/collections/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/collections/page.tsx)

---

## Fitur Belum Dibuat

### Marketplace Scraping Adapter
- **Status**: ❌ Belum dibuat
- **Deskripsi**: Logika backend untuk melakukan fetching dan parsing URL Shopee secara asinkron guna mengambil harga, judul, gambar, jumlah terjual, dan informasi rating seller.

### Import Queue Management Worker
- **Status**: ❌ Belum dibuat
- **Deskripsi**: Worker backend berbasis Postgres Queue yang membaca tabel `import_queue`, menjalankan proses scraping di latar belakang secara berkala, dan memperbarui status antrian.

### AI Enrichment & Fallback Router
- **Status**: ❌ Belum dibuat
- **Deskripsi**: Layanan backend yang memanggil provider AI (Groq, Gemini, OpenRouter) dengan sistem toleransi kegagalan (fallback) untuk menganalisis data produk mentah dan menghasilkan hooks, angles, serta affiliate score.

### Public Pages & SEO Catalog
- **Status**: ❌ Belum dibuat
- **Deskripsi**: Tampilan katalog publik utama, sistem pencarian berbasis teks penuh (full-text search), sitemap.xml otomatis, dan metadata terstruktur JSON-LD untuk SEO.

---

## Dummy / Mock / Placeholder

### Lokasi Data Dummy di Frontend

- **File**: [app/admin/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/page.tsx)
  - **Masalah**: Metrik dashboard (`placeholderMetrics`), tindakan cepat (`quickActions`), dan audit log (`recentActivities`) di-hardcode di sisi client.
- **File**: [app/admin/products/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/products/page.tsx)
  - **Masalah**: Array produk `initialProducts` merupakan hardcoded data dummy.
- **File**: [features/products/components/product-form.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/features/products/components/product-form.tsx)
  - **Masalah**: Opsi kategori di-hardcode. Handler `handleSave` hanya menampilkan `alert()` simulasi dan melakukan redirect menggunakan `router.push('/admin/products')` tanpa memanggil database/API.
- **File**: [app/admin/categories/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/categories/page.tsx)
  - **Masalah**: Menggunakan local state `initialCategories` data dummy.
- **File**: [app/admin/tags/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/tags/page.tsx)
  - **Masalah**: Menggunakan data dummy local state `initialTags`.
- **File**: [app/admin/collections/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/collections/page.tsx)
  - **Masalah**: Menggunakan data dummy local state `initialCollections`.

---

## Database Status

### Tabel

| Tabel | Status |
|---|---|
| `admins` | ✅ Terdefinisi (Supabase RLS aktif) |
| `categories` | ✅ Terdefinisi (Supabase RLS aktif) |
| `subcategories` | ✅ Terdefinisi (Supabase RLS aktif) |
| `tags` | ✅ Terdefinisi (Supabase RLS aktif) |
| `problems` | ✅ Terdefinisi (Supabase RLS aktif) |
| `products` | ✅ Terdefinisi (Supabase RLS aktif) |
| `product_links` | ✅ Terdefinisi (Supabase RLS aktif) |
| `product_tags` | ✅ Terdefinisi (Supabase RLS aktif) |
| `product_problems` | ✅ Terdefinisi (Supabase RLS aktif) |
| `product_ai_metadata` | ✅ Terdefinisi (Supabase RLS aktif) |
| `product_ai_versions` | ✅ Terdefinisi (Supabase RLS aktif) |
| `collections` | ✅ Terdefinisi (Supabase RLS aktif) |
| `collection_products` | ✅ Terdefinisi (Supabase RLS aktif) |
| `insights` | ✅ Terdefinisi (Supabase RLS aktif) |
| `insight_products` | ✅ Terdefinisi (Supabase RLS aktif) |
| `import_sessions` | ✅ Terdefinisi (Supabase RLS aktif) |
| `import_queue` | ✅ Terdefinisi (Supabase RLS aktif) |
| `duplicate_candidates` | ✅ Terdefinisi (Supabase RLS aktif) |
| `product_reports` | ✅ Terdefinisi (Supabase RLS aktif) |
| `product_suggestions` | ✅ Terdefinisi (Supabase RLS aktif) |
| `audit_logs` | ✅ Terdefinisi (Supabase RLS aktif) |
| `system_settings` | ✅ Terdefinisi (Supabase RLS aktif) |
| `ai_cache` | ✅ Terdefinisi (Supabase RLS aktif) |
| `seo_redirects` | ✅ Terdefinisi (Supabase RLS aktif) |

### Migration
- **Jumlah migration**: 1
- **Migration terakhir**: [20260622000000_init.sql](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/supabase/migrations/20260622000000_init.sql) (Inisialisasi dasar skema DB)

### RLS (Row Level Security)
- **Status**: ✅ Sudah ada (Seluruh tabel memiliki RLS `ENABLE` dan kebijakan akses khusus admin).

---

## Authentication Status

- **Login**: ✅ Berfungsi (Google OAuth terpasang di client)
- **Register**: ❌ Belum ada (Akses dibatasi hanya untuk email whitelisted di tabel `admins`)
- **Session**: ✅ Berfungsi (Dicek di server via `@supabase/ssr` cookies pada router proxy)
- **Role**: ✅ Berfungsi (Memeriksa kolom `is_active` dari email user di tabel `admins`)
- **Admin**: ✅ Berfungsi (Proteksi rute `/admin/*` di `proxy.ts`)

---

## API Status

| Endpoint | Method | Status |
|---|---|---|
| `/auth/callback` | GET | ✅ Berfungsi (Menangani pertukaran code session OAuth Google dan verifikasi whitelist admin) |

---

## Deployment Status

- **Local Development**: ✅ Berfungsi (menggunakan script custom Next dev dengan `--webpack` untuk lingkungan Termux)
- **Vercel**: ❌ Belum ada
- **Supabase**: ✅ Berfungsi (Environment API URL & Anon Key disiapkan di `.env.local`)
- **Domain**: ❌ Belum ada
- **CI/CD**: ❌ Belum ada

---

## Technical Debt

### High Priority
- **Ketiadaan CRUD Database di UI**: Halaman admin masih menyimpan modifikasi ke memori/React state lokal. Jika halaman di-refresh, perubahan produk, kategori, dan tag akan hilang. Harus segera diganti menggunakan data fetching asli dari Supabase client.
- **Mock Actions di Product Form**: Form input menyimpan state data kompleks (seperti JSONB hooks dan angles) tetapi belum mengirimkannya ke endpoint Server Action atau Router Handler database.

### Medium Priority
- **SWC Node v26 Serialization Issue di Termux**: Build production gagal saat menggunakan SWC NodeJS WASM bawaan. Menggunakan opsi `--webpack` di config Next.js adalah solusi sementara, namun perlu dicarikan perbaikan kompatibilitas jangka panjang agar build di server CI/CD (non-Termux) tidak terganggu.
- **State Types bertipe `any`**: Beberapa parameter callback dan array props di `product-form.tsx` menggunakan type `any`, yang mengurangi keamanan tipe data TypeScript (*Type Safety*).

### Low Priority
- **Redirect Rute Kosong**: Rute publik (`app/page.tsx`) masih berupa template bawaan Next.js, belum ada alur pengalihan (redirect) otomatis bagi user umum.

---

## Next Priority

1.  **Integrasi Database di Product List**: Hubungkan daftar produk [app/admin/products/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/products/page.tsx) dengan Supabase client untuk membaca data dinamis dari tabel `products` dan `product_links`.
2.  **Binding Form Save Action**: Ubah handler simpan di [product-form.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/features/products/components/product-form.tsx) agar melakukan `INSERT`/`UPDATE` data ke Supabase (tabel `products`, `product_links`, dan `product_ai_metadata`).
3.  **Koneksi Database Taksonomi & Koleksi**: Lakukan binding database Supabase ke halaman Kategori, Tag, dan Koleksi.
4.  **Menampilkan Statistik Real-time Dashboard**: Hubungkan metrik total produk, queue, dan user reports di [app/admin/page.tsx](file:///data/data/com.termux/files/home/storage/downloads/1.Project/koripa/app/admin/page.tsx) dengan agregasi data Supabase.
5.  **Implementasi Scraper Shopee (Milestone 4)**: Buat modul parsing Shopee URL untuk mengambil data detail penjualan secara asinkron.
6.  **Pembangunan Import Queue Worker**: Buat API endpoint `/api/import/process` yang bertindak sebagai pemroses antrian item.
7.  **Integrasi Layanan AI Router**: Implementasikan fallback router Groq $\rightarrow$ Gemini untuk ekstraksi hooks promosi.
8.  **Pembuatan Katalog Publik**: Bangun rute publik utama (`app/(public)`) untuk menampilkan produk yang dipublikasikan (`status = 'published'`).
9.  **Optimasi SEO & Sitemap**: Implementasikan generator sitemap otomatis dan metadata JSON-LD pada detail produk publik.
10. **Konfigurasi Docker & Deploy HF Spaces**: Siapkan berkas Dockerfile dan deploy aplikasi KORIPA ke Hugging Face Spaces.

---

## Estimasi Kesiapan Production

- **Kesiapan Production**: **40%**
- **Risiko terbesar**: Kegagalan antrian queue worker akibat HF Spaces memasuki mode tidur (*sleep mode*), serta pemblokiran IP oleh Cloudflare/anti-scraping Shopee saat proses parsing data.
- **Bottleneck terbesar**: Ketergantungan modifikasi Next.js dev server pada Termux Android yang mengharuskan kompilasi manual Webpack bypass SWC native compiler.
- **Saran langkah berikutnya**: Hubungkan UI form admin ke Supabase terlebih dahulu agar transisi dari data dummy ke data nyata selesai, sebelum mulai membangun modul backend scraping di Milestone 4.
