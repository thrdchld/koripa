# PROJECT_STRUCTURE.md

# KORIPA

## Komitan Riset Produk Affiliate

Version: 1.0

---

# ROOT STRUCTURE

/
app
components
features
services
lib
hooks
types
styles
public
scripts
docs
supabase

---

# APP

app/

Berisi routing Next.js App Router.

---

# ROUTES

app/

(page publik)

(product)

(category)

(problem)

(collection)

(insight)

(search)

(admin)

(api)

---

# PUBLIC ROUTES

/

/product/[slug]

/category/[slug]

/problem/[slug]

/collection/[slug]

/insight/[slug]

/search/[query]

---

# ADMIN ROUTES

/admin

/admin/products

/admin/import

/admin/review

/admin/collections

/admin/insights

/admin/reports

/admin/settings

/admin/logs

---

# COMPONENTS

components/

Komponen global reusable.

---

# EXAMPLES

Button

Input

Modal

Dialog

Card

Badge

Pagination

Breadcrumb

Skeleton

---

# FEATURES

features/

Semua business logic dipisahkan per domain.

---

# FEATURES LIST

products

categories

problems

collections

insights

search

bookmarks

admin

auth

reports

ai

marketplace

seo

---

# FEATURE STRUCTURE

features/products

components

hooks

services

types

utils

---

# SERVICES

services/

Semua komunikasi eksternal.

---

# SERVICES LIST

supabase.service.ts

ai-router.service.ts

marketplace.service.ts

search.service.ts

storage.service.ts

---

# LIB

lib/

Utility global.

---

# EXAMPLES

constants

validators

formatters

helpers

---

# HOOKS

hooks/

Reusable React hooks.

---

# EXAMPLES

use-bookmarks

use-search

use-products

use-auth

---

# TYPES

types/

Global TypeScript types.

---

# EXAMPLES

product.ts

collection.ts

insight.ts

user.ts

api.ts

---

# STYLES

styles/

Theme dan global styles.

---

# PUBLIC

public/

Images

Icons

Logos

Favicons

---

# SCRIPTS

scripts/

Migration

Seed

Import

Maintenance

---

# DOCS

docs/

Seluruh dokumentasi proyek.

---

# SUPABASE

supabase/

migrations

seed

policies

---

# API STRUCTURE

app/api

products

collections

insights

search

import

review

reports

ai

---

# NAMING RULES

File:

kebab-case

Component:

PascalCase

Type:

PascalCase

Hook:

useSomething

Service:

SomethingService

---

# COMPONENT RULES

Maksimum satu tanggung jawab.

Hindari komponen raksasa.

---

# SERVICE RULES

Semua database query melalui service layer.

Jangan query langsung dari UI.

---

# PAGE RULES

Page hanya mengatur layout dan orchestration.

Business logic berada di feature.

---

# FEATURE RULES

Feature adalah pusat business logic.

---

# IMPORT RULES

Import flow dipisahkan dari UI.

Harus dapat digunakan kembali.

---

# AI RULES

AI dipisahkan ke feature dan service sendiri.

Tidak boleh tersebar di banyak tempat.

---

# SEARCH RULES

Search harus menjadi feature mandiri.

Karena merupakan fitur inti KORIPA.

---

# SEO RULES

SEO helper dipisahkan.

Jangan copy paste metadata logic.

---

# TESTABILITY RULES

Semua service harus mudah diuji.

Semua feature harus dapat diuji secara terpisah.

---

# FUTURE READY

Struktur harus siap untuk:

Mobile App

Multi Marketplace

Multi AI Provider

Team Features

Tanpa reorganisasi besar.
