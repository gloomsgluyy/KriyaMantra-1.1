# Execution Log — Kriyamantra

Dokumen ini mencatat seluruh aktivitas rekayasa, keputusan arsitektur, verifikasi kode, dan status handover modul secara kronologis dan berbasis bukti.

---

## [EXEC-001] Setup Scaffolding, Warm Amber Design Tokens, and UI Library Foundation
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** Foundation / Scaffolding & Design System
**Tipe:** Implementation FE

### Latar Belakang
Proyek Kriyamantra membutuhkan fondasi teknis Next.js 16 App Router dengan React 19, Tailwind CSS v4, integrasi TanStack Query v5, dan pustaka komponen dari HeroUI v3 serta Cult UI sesuai panduan `AI_RULES.md`, `DESIGN.md`, `00-CODEBASE-STANDARD.md`, dan `TECH_STACK_AND_TANSTACK_QUERY.md`. Sebelumnya workspace belum memiliki `package.json` dan struktur folder aplikasi di root.

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|
| Menggunakan Next.js 16.4.4 & React 19.3.1 | Sesuai spesifikasi `00-CODEBASE-STANDARD.md` dan `TECH_STACK_AND_TANSTACK_QUERY.md`. | Next.js 15 (diputuskan tetap menggunakan v16 sesuai dokumen acuan). |
| Mengadopsi palet Warm Amber & font Host Grotesk di `globals.css` | Mengikuti aturan visual Kriya Mantra di `DESIGN.md` dan referensi `design-refference/styles.css`. | Menggunakan tema default Tailwind (ditolak karena tidak mencerminkan identitas budaya perajin Bali). |
| Migrasi komponen primitif dari `ui-libbrary/cult-ui` & `@heroui/react` | Mematuhi aturan ketat AI_RULES Aturan 3: dilarang membuat komponen dari nol. | Membuat komponen custom dari nol (dilarang keras oleh aturan). |
| Setup `QueryClient` singleton untuk browser dengan default staleTime 30s | Mengikuti arsitektur caching server state di `00-CODEBASE-STANDARD.md` Section 6. | Fetch manual tanpa state cache (rawan duplikasi request). |

### Routing
| Jenis | Route / Endpoint | File | Akses (public / auth / role) |
|---|---|---|---|
| Page | `/` | `app/page.tsx` | Public |

### Files Changed
- `package.json` - Definisi dependensi Next.js 16, React 19, Tailwind v4, TanStack Query, HeroUI v3, dan pustaka pendukung.
- `tsconfig.json` - Konfigurasi TypeScript strict dengan alias `@/*`.
- `postcss.config.mjs` - Integrasi `@tailwindcss/postcss` untuk Tailwind v4.
- `next.config.mjs` - Konfigurasi Next.js dengan optimasi gambar remote dan strict mode.
- `app/globals.css` - Deklarasi `@import "tailwindcss"`, `@import "@heroui/styles"`, font Host Grotesk, token warna Warm Amber, dan animasi audio wave.
- `app/layout.tsx` - Root layout dengan bahasa Indonesia, metadata Kriya Mantra, dan wrap `Providers`.
- `app/providers.tsx` - Client component pembungkus `QueryClientProvider`.
- `lib/query-client.ts` - Singleton browser `QueryClient` dan server query factory.
- `lib/query-keys.ts` - Daftar query keys stabil untuk seluruh 19 modul.
- `lib/api-client.ts` - Helper HTTP terpusat dengan error handling aman (`ApiRequestError`).
- `lib/utils.ts` - Utilitas penggabungan kelas CSS (`clsx` + `tailwind-merge`).
- `types/api.ts` - Definisi tipe standar `ApiSuccess<T>`, `ApiError`, dan `ApiResponse<T>`.
- `components/ui/button.tsx` - Komponen Button diadopsi dari library dengan varian Warm Amber (`amber`, `dark`, `compact`, `outline`, `secondary`) dan indikator audio wave.
- `components/ui/card.tsx` - Komponen Card diadopsi dari library dengan sudut 28px dan varian (`default`, `cream`, `dark`).
- `components/ui/input.tsx` - Komponen Input diadopsi dari library dengan sudut 14px dan ring amber.
- `components/ui/badge.tsx` - Komponen Badge pill dengan varian semantik (`amber`, `cream`, `success`, `warning`, `danger`).
- `components/ui/tabs.tsx` - Komponen Tabs pill diadopsi dari library.
- `components/ui/speech-bubble.tsx` - Komponen chat bubble diadopsi dari `cult-ui` dengan sudut asimetris (20px + tail 5px) dan indikator waveform.
- `components/ui/copy-button.tsx` - Komponen tombol salin caption dengan animasi centang dari `cult-ui`.
- `components/ui/halo-dropzone.tsx` - Komponen file uploader dari `cult-ui`.
- `components/ui/apple-iphone-17-pro.tsx` - Mockup frame smartphone untuk preview poster IG feed/story dari `cult-ui`.
- `public/assets/` - Salinan aset brand (SVG logo, hero asset), ilustrasi, dan foto produk dari `design-refference`.
- `app/page.tsx` - Halaman landing utama Kriya Mantra sekaligus smoke test verifikasi implementasi desain Warm Amber.

### UI Library yang Dipakai
- `Button` (`components/ui/button.tsx` - diadopsi dari `ui-libbrary/cult-ui/apps/www/components/ui/button.tsx`) di `app/page.tsx`.
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (`components/ui/card.tsx` - diadopsi dari `ui-libbrary/cult-ui/apps/www/components/ui/card.tsx`) di `app/page.tsx`.
- `Badge` (`components/ui/badge.tsx` - diadopsi dari `ui-libbrary/cult-ui/apps/www/components/ui/badge.tsx`) di `app/page.tsx`.
- `SpeechBubble` (`components/ui/speech-bubble.tsx` - diadopsi dari `ui-libbrary/cult-ui/apps/www/registry/default/ui/speech-bubble.tsx`) di `app/page.tsx`.
- `CopyButton` (`components/ui/copy-button.tsx` - diadopsi dari `ui-libbrary/cult-ui/apps/www/registry/default/ui/copy-button.tsx`) di `app/page.tsx`.
- Seluruh komponen UI yang dibutuhkan tersedia di pustaka komponen workspace; tidak ada komponen baru yang dibuat dari nol.

### Acceptance Evidence
- Halaman publik `/` berhasil menampilkan floating pill navigation dengan brand logo Kriya Mantra.
- Hero section menampilkan judul "Foto produkmu, jadi poster siap posting." dan 3 poin proposisi nilai.
- Card interaktif menampilkan simulasi chat asisten AI dengan speech bubble artisan bergelombang audio dan copy button yang berfungsi.
- Alur 4 langkah kerja ditampilkan dalam 3 kartu modular di atas background cream sheet bersudut 56px.
- Footer dark surface `#292524` memuat rujukan kompetisi Bali DigiFest 2026.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, rute `/` dan `/_not-found` berhasil dikompilasi secara statis dalam 25 detik).

### Skills dan Docs yang Dibaca
- `AI_RULES.md`
- `DESIGN.md`
- `HOW TO USE COMPONENT` (`DESIGN-PRICIPLE_HERO-UI`, `FRAMEWORK_HERO-UI`, `GUIDE_CULT-UI`, `QUICK_SETUP_HERO-UI`)
- `docs/00_PROJECT_CONTEXT.md`
- `docs/01_PRD.md`
- `docs/00-CODEBASE-STANDARD.md`
- `docs/TECH_STACK_AND_TANSTACK_QUERY.md`
- `ui-libbrary/cult-ui/DESIGN.md`
- `ui-libbrary/heroui/AGENTS.md`

### Known Issues / Next Step
- Modul autentikasi (`/login`, `/register`) dan onboarding 5 langkah (`/onboarding`) belum memiliki rute halaman aktif.
- Next Step: Memulai **Fase 1: Implementasi Modul Authentication (`AUTH`) & Onboarding Wizard (`ONB`)**.



---

## [EXEC-002] Modul Authentication (AUTH) dan Wizard Onboarding 5 Langkah (ONB)
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** AUTH (Authentication) & ONB (Onboarding)
**Tipe:** Implementation FE

### Latar Belakang
Sesuai `SRS_AUTH_FE.md` dan `SRS_ONB_FE.md`, Kriyamantra membutuhkan antarmuka autentikasi (`/login`, `/register`) yang mendukung akun crafter dan mode instan juri (`DEMO_JUDGE`, F-AUTH-04), serta wizard onboarding bertahap 5 langkah (`/onboarding`) yang mencakup info usaha, persetujuan eksplisit AI (F-ONB-03), pemilihan sumber data dengan uploader `HaloDropzone` (F-ONB-04), review persona/fakta terverifikasi (F-ONB-05), dan penyelesaian onboarding menuju pembuatan poster pertama (F-ONB-06).

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|
| Menyediakan tombol "Masuk Instan Mode Juri" di form login | Memenuhi fitur F-AUTH-04 PRD agar juri Bali DigiFest 2026 dapat menguji alur secara instan tanpa hambatan pendaftaran. | Hanya form login biasa (akan memperlambat evaluasi juri). |
| Wizard 5 langkah linear dengan progress bar dan tombol kembali | Memenuhi F-ONB-01 & F-ONB-02 perajin tidak bingung dan dapat meninjau langkah sebelumnya kapan saja. | Single page form panjang (membebani perajin tradisional). |
| Integrasi `HaloDropzone` dari Cult UI untuk upload brosur/katalog | Mematuhi aturan UI library (Aturan 3) dan memberikan interaksi drag-and-drop modern untuk ekstraksi produk. | File input HTML standar (kurang menarik dan tidak sesuai standar kompetisi). |
| Menyimpan state onboarding di TanStack Query dan Route Handler | Menjamin persistensi data antar-langkah dan sinkronisasi server state per tenant `businessId`. | Local state murni di komponen (data hilang jika halaman di-refresh). |

### Routing
| Jenis | Route / Endpoint | File | Akses (public / auth / role) |
|---|---|---|---|
| Page | `/login` | `app/(public)/login/page.tsx` | Public |
| Page | `/register` | `app/(public)/register/page.tsx` | Public |
| Page | `/onboarding` | `app/(app)/onboarding/page.tsx` | Auth / Crafter / Demo Judge |
| Endpoint | `/api/auth/signin` | `app/api/auth/signin/route.ts` | Public (POST) |
| Endpoint | `/api/auth/signup` | `app/api/auth/signup/route.ts` | Public (POST) |
| Endpoint | `/api/auth/session` / `/me` | `app/api/auth/me/route.ts` | Session cookie (GET) |
| Endpoint | `/api/auth/signout` | `app/api/auth/signout/route.ts` | Session cookie (POST) |
| Endpoint | `/api/onboarding/state` | `app/api/onboarding/state/route.ts` | Scoped tenant (GET) |
| Endpoint | `/api/onboarding/step` | `app/api/onboarding/step/route.ts` | Scoped tenant (POST) |

### Files Changed
- `types/auth.ts` - Definisi tipe user session, peran (`CRAFTER`, `DEMO_JUDGE`, `ADMIN`), dan kredensial.
- `types/onboarding.ts` - Definisi tipe kategori kerajinan Bali, tipe sumber data, dan model state 5 langkah.
- `hooks/use-auth.ts` - Custom hook TanStack Query untuk sign-in, sign-up, sign-out, dan status sesi.
- `hooks/use-onboarding.ts` - Custom hook TanStack Query untuk mutasi penyimpanan langkah dan penyelesaian onboarding.
- `components/ui/textarea.tsx` - Adaptasi textarea dengan border radius 14px dan ring amber.
- `app/api/auth/signin/route.ts` - Route Handler login dengan dukungan mode demo juri dan pembuatan cookie sesi `km_session`.
- `app/api/auth/signup/route.ts` - Route Handler pendaftaran akun perajin dengan validasi input.
- `app/api/auth/me/route.ts` - Route Handler verifikasi cookie sesi Supabase.
- `app/api/auth/signout/route.ts` - Route Handler penghapusan cookie sesi.
- `app/api/onboarding/state/route.ts` - Route Handler pembacaan state onboarding per tenant.
- `app/api/onboarding/step/route.ts` - Route Handler pembaruan progres langkah onboarding.
- `app/(public)/login/page.tsx` - Halaman login lengkap dengan form email/password, banner juri, validasi inline, dan tombol audio wave.
- `app/(public)/register/page.tsx` - Halaman pendaftaran sanggar perajin dengan form nama usaha dan pemilik.
- `app/(app)/onboarding/page.tsx` - Layar wizard 5 langkah dengan stepper, consent AI, kartu pilihan sumber usaha (`HaloDropzone`), review profil berlabel sumber fakta, dan CTA ke chat poster.

### UI Library yang Dipakai
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` (`components/ui/card.tsx`) di `/login`, `/register`, `/onboarding`.
- `Button` (`components/ui/button.tsx`) di `/login`, `/register`, `/onboarding`.
- `Input` (`components/ui/input.tsx`) di form login, pendaftaran, dan identitas usaha.
- `Textarea` (`components/ui/textarea.tsx`) di deskripsi usaha pada onboarding langkah 1.
- `Badge` (`components/ui/badge.tsx`) di penanda mode juri, langkah wizard, dan label sumber fakta.
- `HaloDropzone` (`components/ui/halo-dropzone.tsx`) di pilihan sumber unggah brosur/katalog langkah 3.
- Seluruh komponen mematuhi sistem desain Warm Amber dan tidak dibuat dari nol.

### Acceptance Evidence
- Masuk ke `/login` menampilkan form kredensial aman serta tombol khusus "Masuk Instan Mode Juri" dengan badge sandbox.
- Masuk ke `/register` menampilkan form pendaftaran perajin dengan validasi field wajib.
- Masuk ke `/onboarding` menampilkan wizard 5 langkah terpadu dengan navigasi maju/mundur.
- Langkah 2 mewajibkan persetujuan eksplisit AI sebelum tombol lanjut aktif.
- Langkah 3 menyediakan 4 kartu sumber (Brosur dengan `HaloDropzone`, Instagram, Chat, Lewati).
- Langkah 4 menampilkan fakta terverifikasi berlabel sumber (`USER_INPUT`, `AI_INFERENCE`).
- Langkah 5 mengarahkan pengguna ke alur pembuatan poster pertama di `/chat`.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 12 rute statis & dinamis terkompilasi dalam 12.4 detik).

### Skills dan Docs yang Dibaca
- `docs/fe/SRS_AUTH_FE.md`
- `docs/fe/SRS_ONB_FE.md`
- `docs/01_PRD.md` (F-AUTH-01 s/d F-AUTH-05, F-ONB-01 s/d F-ONB-06)
- `docs/00-CODEBASE-STANDARD.md`
- `ui-libbrary/cult-ui/apps/www/content/docs/components/wizard-expandable.mdx`
- `ui-libbrary/cult-ui/apps/www/content/docs/components/halo-dropzone.mdx`

### Known Issues / Next Step
- Modul Chat Agent (`CHAT`, `/chat`), Katalog Produk (`CAT`, `/products`), dan Profil Memori (`MEM`, `/profile`) siap dikerjakan pada fase berikutnya.
- Next Step: Memulai **Fase 2: Profil Brand Memory (`MEM`) & Katalog Produk (`CAT`)**, lalu **Fase 3: Core AI Chat Agent (`CHAT`) & Creative Engine (`GEN`)**.


---

## [EXEC-003] Redesign Login, Register, dan Onboarding dengan Hallmark, UI/UX Pro Max, dan Antislop
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** AUTH & ONB (Redesign)
**Tipe:** Implementation FE

### Latar Belakang
Pengguna meminta perombakan total pada layar `/login`, `/register`, dan `/onboarding` dengan memuat skill `hallmark`, `ui-ux-pro-max`, dan `antislop-ui`. Tinjauan sebelumnya mengidentifikasi dua kekurangan penting: (1) font `Host Grotesk` belum ter-load secara konsisten dari Google Fonts sehingga sempat fallback ke font sistem, dan (2) pemakaian komponen UI canggih dari `ui-libbrary/` masih minim. Redesign ini mengangkat standar visual menjadi artisanal, ergonomis, dan sarat komponen interaktif nyata.

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|
| Load Google Fonts `Host Grotesk` langsung di `<head>` via `<link>` di `layout.tsx` | Memastikan seluruh bobot font (300 s/d 800) ter-render sempurna tanpa jeda FOUT dan selaras persis dengan `design-refference`. | Mengandalkan `@font-face` lokal/URL tunggal (berisiko gagal muat antar-browser). |
| Menerapkan tata letak split-screen pada `/login` dan `/register` | Memenuhi prinsip Hallmark & UI/UX Pro Max: sisi kiri menampilkan bukti visual kerajinan Bali (`poster-1.webp`, `raw-fabric.jpg`), sisi kanan fokus pada aksi masuk/daftar. | Tampilan centered kartu polos (terlalu generik dan minim konteks brand). |
| Integrasi `HaloCard` bersinar lembut untuk Akses Juri Lomba di `/login` | Memberikan penekanan visual khusus untuk juri Bali DigiFest tanpa melanggar batas anti-slop (glow dosis tunggal). | Kartu biasa tanpa rim animation (kurang menonjol untuk kebutuhan lomba). |
| Menghadirkan mockup perangkat `AppleIPhone17Pro` interaktif di `/onboarding` | Menyediakan preview live Instagram Feed yang ter-update secara *real-time* saat perajin mengetik nama sanggar dan deskripsi karyanya. | Form step statis tanpa live feedback (mengurangi wow-factor evaluasi). |
| Mematuhi Hallmark Floor & Antislop Checklist | Menghapus seluruh emoji dekoratif, gradien biru-ungu generik, status dot tak berarti, dan menggunakan palet murni Warm Amber. | Membiarkan ikon dan gaya default template (terkesan buatan template AI). |

### Routing
| Jenis | Route / Endpoint | File | Akses (public / auth / role) |
|---|---|---|---|
| Page | `/login` | `app/(public)/login/page.tsx` | Public |
| Page | `/register` | `app/(public)/register/page.tsx` | Public |
| Page | `/onboarding` | `app/(app)/onboarding/page.tsx` | Auth / Crafter / Demo Judge |

### Files Changed
- `app/layout.tsx` - Menambahkan `<link rel="preconnect">` dan `<link href="...family=Host+Grotesk...">` resmi dari Google Fonts.
- `app/globals.css` - Sinkronisasi token `--font-host`, aturan `overflow-x: clip`, `:focus-visible`, dan kelas tipografi `DESIGN.md`.
- `components/ui/halo-card.tsx` - Komponen kartu interaktif dengan efek animated rim trail dari Cult UI.
- `app/(public)/login/page.tsx` - Redesign split-screen: pameran poster karya tenun Bali di kiri, `HaloCard` instan juri dan form kredensial aman di kanan.
- `app/(public)/register/page.tsx` - Redesign split-screen: cerita warisan kain tenun Bali di kiri, form registrasi sanggar dengan ikon Lucide di kanan.
- `app/(app)/onboarding/page.tsx` - Redesign workbench interaktif: form wizard 5 langkah (kategori interaktif, izin AI, `HaloDropzone` uploader, review memori fakta) di kiri, dan live mockup `AppleIPhone17Pro` serta `SpeechBubble` di kanan.

### UI Library yang Dipakai
- `AppleIPhone17Pro` (`components/ui/apple-iphone-17-pro.tsx` dari `cult-ui`) pada live preview onboarding.
- `HaloCard`, `HaloCardHeader`, `HaloCardTitle`, `HaloCardDescription`, `HaloCardContent` (`components/ui/halo-card.tsx` dari `cult-ui`) pada banner juri di `/login`.
- `HaloDropzone` (`components/ui/halo-dropzone.tsx` dari `cult-ui`) pada upload foto brosur/katalog di `/onboarding` langkah 3.
- `SpeechBubble` (`components/ui/speech-bubble.tsx` dari `cult-ui`) pada panduan asisten AI pendamping di `/onboarding`.
- `Card`, `Input`, `Textarea`, `Button`, `Badge` (dari `components/ui/`) pada seluruh alur input data.

### Acceptance Evidence
- Membuka `/login` memperlihatkan tipografi **Host Grotesk** yang tajam dan otentik, poster kain tenun Sekar Jepun di sisi kiri, dan `HaloCard` Akses Khusus Juri di sisi kanan.
- Membuka `/register` menyajikan layout terpadu dengan pameran foto kain tenun tradisional Bali (`raw-fabric.jpg`) dan form pendaftaran sanggar.
- Membuka `/onboarding` menyajikan workbench 2 kolom: saat pengguna mengganti nama sanggar atau kategori kerajinan di sebelah kiri, mockup **Apple iPhone 17 Pro Max** di sebelah kanan seketika memperbarui preview postingan Instagram feed secara live.
- Seluruh elemen interaktif memenuhi standar kontras WCAG AA dan target sentuh minimal 44px.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 12 rute statis & dinamis terkompilasi sempurna).
- Server dev aktif di `http://localhost:3000`.

### Skills dan Docs yang Dibaca
- `.agents/skills/hallmark/SKILL.md` (The Floor, Flow, Typography, Anti-Template, Restraint)
- `.agents/skills/ui-ux-pro-max/SKILL.md` (Design Intelligence, Accessible Targets, Touch Feedback)
- `.agents/skills/antislop-ui/SKILL.md` (Color Gradients ban, Glassmorphism dose caps, Emoji ban, No fake buzzwords)
- `DESIGN.md` (Kriya Mantra Warm Amber palette, Host Grotesk specifications)
- `design-refference/styles.css` & `index.html`

### Known Issues / Next Step
- Penyesuaian Umpan Balik Pengguna: Menghapus bilah navigasi (navbar) dan mockup iPhone dari `/onboarding` (kembali ke wizard 5 langkah terpusat). Menghapus komponen `HaloCard` dari `/login` yang menghasilkan efek pendaran neon pelangi/cyan tidak relevan, digantikan dengan kartu solid Warm Amber (`#fffbeb`, border `#fde68a`) yang bersih dan harmonis dengan tema budaya Bali. Menghapus indikator audio wave 3 garis vertikal dari komponen `Button`. Komponen `AppleIPhone17Pro` dipindahkan secara eksklusif ke modul Creative Engine (`/create/{id}`).
- Modul berikutnya: Brand Memory Profile (`/profile`), Product Catalog (`/products`), Chat Agent (`/chat`), dan Creative Engine (`/create/{id}`).


---

## [EXEC-004] Modul Brand Memory Profile (MEM) dan Katalog Produk (CAT)
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** MEM (Brand Memory Profile) & CAT (Product Catalog)
**Tipe:** Implementation FE

### Latar Belakang
Sesuai perencanaan teknis `fase-2-brand-memory-and-product-catalog.md` yang telah disetujui pengguna dan spesifikasi `SRS_MEM_FE.md` serta `SRS_CAT_FE.md`, Kriyamantra membutuhkan antarmuka pengelolaan pengetahuan sanggar:
1. Layar **`/profile`** (`MEM`): Mengelola data identitas sanggar, Brand Kit (palet warna kriya, gaya bahasa/brand voice, target pasar), daftar fakta terverifikasi berlabel sumber (*provenance* `USER_INPUT`, `AI_INFERENCE`, `IG_SYNC`), serta ringkasan batas konteks etis AI (*bounded context*).
2. Layar **`/products`** (`CAT`): Mengelola galeri karya kriya dengan filter status promosi Instagram (`Belum Dipromosikan`, `Terjadwal`, `Sudah Diposting`), pencarian, drawer mobile-first untuk tambah/edit karya (`Drawer`), uploader resolusi tinggi (`HaloDropzone`), dan dialog konfirmasi hapus aman (`AlertDialog`).

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|
| Mengadopsi `ColorPicker` dengan palet alami kriya Bali di `/profile` | Memungkinkan perajin memilih warna wastra (merah mengkudu, kuning kunyit, hitam arang pejaten) secara visual dan presisi tanpa mengetik manual. | Input teks kode hex polos (membingungkan perajin tradisional). |
| Mengadopsi `DirectionAwareTabs` dari Cult UI | Transisi animasi arah (*direction-aware*) yang mulus antar tab profil (*Identitas*, *Brand Kit*, *Memori*, *Konteks AI*) menjaga layout tetap tenang tanpa reload. | Tab link biasa yang memicu full page navigation (kurang responsif). |
| Menggunakan `Drawer` (Vaul) untuk form tambah karya di `/products` | Desain *mobile-first bottom sheet* sangat ergonomis bagi jempol perajin saat menggunakan ponsel pintar di sentra kerajinan. | Modal dialog pop-up tengah layar (sempit dan canggung di layar smartphone). |
| Menghadirkan `AlertDialog` untuk konfirmasi hapus fakta & produk | Memenuhi aksesibilitas WCAG AA (fokus terkunci, tombol batal sebagai default) guna mencegah perajin menghapus karya tanpa sengaja. | `window.confirm()` bawaan browser (kasar, tidak selaras tema brand). |
| Menggunakan `HaloDropzone` untuk unggah foto karya | Memberikan interaksi drag-and-drop modern dan visualisasi format file gambar yang ramah pengguna. | File input HTML standar polos. |

### Routing
| Jenis | Route / Endpoint | File | Akses (public / auth / role) |
|---|---|---|---|
| Page | `/profile` | `app/(app)/profile/page.tsx` | Auth / Crafter / Demo Judge |
| Page | `/products` | `app/(app)/products/page.tsx` | Auth / Crafter / Demo Judge |
| Endpoint | `/api/profile` | `app/api/profile/route.ts` | Scoped tenant (GET, PUT) |
| Endpoint | `/api/profile/memory` | `app/api/profile/memory/route.ts` | Scoped tenant (GET, POST, DELETE) |
| Endpoint | `/api/products` | `app/api/products/route.ts` | Scoped tenant (GET, POST) |
| Endpoint | `/api/products/[id]` | `app/api/products/[id]/route.ts` | Scoped tenant (GET, PATCH, DELETE) |

### Files Changed
- `components/ui/label.tsx` - Komponen Label berbasis `radix-ui` dengan tipografi Host Grotesk.
- `components/ui/popover.tsx` - Komponen Popover berbasis `radix-ui` untuk ColorPicker.
- `components/ui/dialog.tsx` - Komponen Dialog modal berbasis `radix-ui`.
- `components/ui/alert-dialog.tsx` - Komponen AlertDialog konfirmasi berbasis `radix-ui`.
- `components/ui/color-picker.tsx` - Komponen ColorPicker interaktif dengan slider hue, input hex, dan preset palet kriya Bali.
- `components/ui/direction-aware-tabs.tsx` - Komponen DirectionAwareTabs dengan animasi bubble Motion.
- `types/memory.ts` - Definisi tipe `BusinessProfile`, `BrandKit`, `VerifiedFact`, `SourceProvenance`, dan input mutasi.
- `types/product.ts` - Definisi tipe `Product`, `PromotionStatus`, `ProductCreateInput`, dan `ProductUpdateInput`.
- `lib/query-keys.ts` - Penambahan kunci query `memory.list` dan `memory.item`.
- `hooks/use-profile.ts` - Custom hook TanStack Query untuk pembacaan profil, mutasi update, tambah fakta, dan hapus fakta memori.
- `hooks/use-products.ts` - Custom hook TanStack Query untuk daftar produk, mutasi create, update, dan delete dengan invalidasi reaktif.
- `app/api/profile/route.ts` - Route handler GET/PUT profil sanggar Tenun Sekar Jepun & Brand Kit.
- `app/api/profile/memory/route.ts` - Route handler GET/POST/DELETE fakta memori berlabel sumber.
- `app/api/products/route.ts` - Route handler GET/POST katalog produk kriya dengan filter status dan pencarian.
- `app/api/products/[id]/route.ts` - Route handler GET/PATCH/DELETE detail produk tunggal.
- `app/(app)/profile/page.tsx` - Layar manajemen Brand Memory dengan 4 tab `DirectionAwareTabs`, `ColorPicker`, daftar memori terverifikasi, dan `AlertDialog`.
- `app/(app)/products/page.tsx` - Layar katalog karya kriya dengan filter status promosi, pencarian, grid produk, bottom-sheet `Drawer`, `HaloDropzone`, dan `AlertDialog`.

### UI Library yang Dipakai
- `DirectionAwareTabs` (`components/ui/direction-aware-tabs.tsx` dari `cult-ui`) pada navigasi profil `/profile`.
- `ColorPicker` (`components/ui/color-picker.tsx` dari `cult-ui`) pada pemilihan palet Brand Kit `/profile`.
- `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter` (`components/ui/drawer.tsx` berbasis `vaul`) pada form tambah karya di `/products`.
- `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogAction`, `AlertDialogCancel` (`components/ui/alert-dialog.tsx`) pada konfirmasi penghapusan di `/profile` dan `/products`.
- `HaloDropzone` (`components/ui/halo-dropzone.tsx` dari `cult-ui`) pada uploader foto produk karya di `/products`.
- `Card`, `Badge`, `Button`, `Input`, `Textarea` (`components/ui/`) pada seluruh panel input data.

### Acceptance Evidence
- Membuka `/profile` menampilkan header sanggar terverifikasi, status sinkronisasi Instagram, dan 4 tab animasi geser:
  - Tab 1: Form identitas sanggar (nama, pemilik, lokasi, kontak WhatsApp, filosofi).
  - Tab 2: Brand Kit interaktif dengan `ColorPicker` palet kriya alami (Primary, Secondary, Accent), Brand Voice, dan Target Audiens.
  - Tab 3: Daftar fakta terverifikasi lengkap dengan badge sumber (*provenance* `Diisi Perajin`, `Disimpulkan AI`, `Instagram Sync`), form tambah fakta baru, dan tombol hapus dengan konfirmasi `AlertDialog`.
  - Tab 4: Tampilan batas konteks etis (*bounded context*) yang menjamin tidak adanya halusinasi data saat generasi poster.
- Membuka `/products` menyajikan galeri produk kriya:
  - Filter status promosi (`Semua`, `Belum Promosi`, `Terjadwal`, `Sudah Diposting`) beserta hitungan karya reaktif.
  - Form pencarian produk dengan pemfilteran instan.
  - Kartu produk menampilkan foto karya, harga Rupiah, filosofi motif, badge status promosi, dan tombol aksi "Buat Poster di Chat".
  - Tombol "+ Tambah Karya Baru" membuka `Drawer` dari bawah layar dengan uploader `HaloDropzone` untuk foto produk resolusi tinggi.
  - Penghapusan produk dilindungi oleh dialog konfirmasi `AlertDialog`.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 17 rute statis & dinamis terkompilasi sempurna).
- Server dev melayani rute `/profile` dan `/products` dengan status **HTTP 200 OK**.

### Known Issues / Next Step
- Modul berikutnya: **Fase 3: Core AI Chat Agent (`CHAT`, `/chat`) & Creative Engine (`GEN` & `REV`, `/create/[id]`)** — Selesai dikerjakan pada `[EXEC-005]`.

---

## [EXEC-005] Implementasi Fase 3 — Core AI Chat Agent (`CHAT`) & Creative Engine Studio (`GEN` & `REV`)
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** `CHAT` (Chat Agent), `GEN` (Creative Engine), `REV` (Review & Persetujuan)
**Tipe:** Implementation FE

### Latar Belakang
Mengimplementasikan modul inti dan atraksi utama (wow-factor) aplikasi Kriya Mantra untuk kompetisi Bali DigiFest 2026:
1. Ruang percakapan perajin dengan AI agent pendamping kriya Bali (`/chat`).
2. Meja kerja studio kreasi poster dua kolom (`/create/[id]`) yang dilengkapi simulator frame smartphone nyata (`AppleIPhone17Pro`), toggle rasio format Feed 4:5 vs Story 9:16, editor caption dwibahasa (ID & EN) dengan `DirectionAwareTabs` & `CopyButton`, panel revisi bahasa natural (batas 3 kali), bottom-sheet riwayat versi `Drawer`, quality gate (skor keunikan 98%), dan persetujuan eksplisit `AlertDialog`.

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|
| Menggunakan `iconoir-react` 100% tanpa pengecualian | Mematuhi instruksi eksplisit perajin/user: `lucide-react` dilarang dan di-uninstall. | `lucide-react` (ditolak keras). |
| Mockup frame fisik `AppleIPhone17Pro` pada sisi kiri studio review | Memberikan simulasi tampilan nyata Instagram feed (4:5) dan story (9:16) layar iPhone kepada perajin dan dewan juri kompetisi. | Preview kartu datar biasa tanpa bingkai perangkat nyata (kurang impresif bagi juri). |
| `DirectionAwareTabs` untuk pergantian caption ID vs EN | Transisi arah geser mulus saat beralih antara narasi lokal vs turis asing tanpa layout shift. | Tab HTML statis biasa. |
| Komponen `CopyButton` dari `cult-ui` | Tombol 1-klik dengan animasi centang konfirmasi untuk memudahkan perajin menyalin caption ke clipboard HP. | Tombol teks biasa tanpa feedback animasi. |
| Validasi batas revisi 3x (F-REV-06) pada client & mock API | Menjaga efisiensi kuota generasi dan kepatuhan terhadap PRD. | Revisi tanpa batas. |
| `AlertDialog` untuk persetujuan eksplisit (F-REV-05) | Menjamin transparansi etika AI dan hak cipta karya sebelum poster dijadwalkan ke Instagram. | Tombol simpan langsung tanpa dialog konfirmasi. |

### Routing
| Jenis | Route / Endpoint | File | Akses (public / auth / role) |
|---|---|---|---|
| Page | `/chat` | `app/(app)/chat/page.tsx` | Protected / Crafter |
| Page | `/create` | `app/(app)/create/page.tsx` | Protected / Crafter (Redirects to demo generation) |
| Page | `/create/[id]` | `app/(app)/create/[id]/page.tsx` | Protected / Crafter |
| API | `/api/chat/conversations` | `app/api/chat/conversations/route.ts` | Crafter / Demo Judge |
| API | `/api/chat/messages` | `app/api/chat/messages/route.ts` | Crafter / Demo Judge |
| API | `/api/generations` | `app/api/generations/route.ts` | Crafter / Demo Judge |
| API | `/api/generations/[id]` | `app/api/generations/[id]/route.ts` | Crafter / Demo Judge |
| API | `/api/generations/[id]/review` | `app/api/generations/[id]/review/route.ts` | Crafter / Demo Judge |
| API | `/api/generations/[id]/revisions` | `app/api/generations/[id]/revisions/route.ts` | Crafter / Demo Judge |
| API | `/api/generations/[id]/approve` | `app/api/generations/[id]/approve/route.ts` | Crafter / Demo Judge |

### Files Changed / Created
- `types/chat.ts` - Tipe domain pesan, role, lampiran karya, opsi poster payload, dan percakapan.
- `types/generation.ts` - Tipe status generasi, caption dwibahasa, skor mutu/keunikan, opsi poster, versi revisi, dan detail generasi.
- `lib/mock-generations.ts` - Shared mock store generasi poster untuk Tenun Sekar Jepun.
- `hooks/use-chat.ts` - Custom hook TanStack Query untuk pembacaan pesan dan pengiriman pesan/karya.
- `hooks/use-generation.ts` - Custom hook TanStack Query untuk review generasi, polling asinkron, revisi natural, dan persetujuan final.
- `components/ui/suggestions.tsx` - Komponen Quick Reply Chips diadopsi dari `cult-ui` dengan aksen Warm Amber.
- `app/api/chat/conversations/route.ts` - Handler daftar percakapan chat.
- `app/api/chat/messages/route.ts` - Handler pesan obrolan dengan kartu opsi poster dan simulasi generasi AI.
- `app/api/generations/route.ts` - Handler pembuatan antrean poster baru.
- `app/api/generations/[id]/route.ts` - Handler detail status poster.
- `app/api/generations/[id]/review/route.ts` - Handler data review lengkap studio.
- `app/api/generations/[id]/revisions/route.ts` - Handler pengajuan revisi dengan validasi kuota 3x.
- `app/api/generations/[id]/approve/route.ts` - Handler persetujuan eksplisit poster untuk penjadwalan.
- `app/(app)/chat/page.tsx` - Antarmuka chat AI perajin dengan SpeechBubble, suggestions, picker katalog, dan kartu opsi poster.
- `app/(app)/create/[id]/page.tsx` - Studio review 2 kolom dengan iPhone 17 Pro frame, feed/story toggle, DirectionAwareTabs, CopyButton, Drawer riwayat versi, dan AlertDialog persetujuan.
- `app/(app)/create/page.tsx` - Route redirect `/create` ke studio poster aktif.

### UI Library yang Dipakai
- `SpeechBubble` (`components/ui/speech-bubble.tsx` dari `cult-ui`) pada thread percakapan chat.
- `IPhone17ProMax` (`components/ui/apple-iphone-17-pro.tsx` dari `cult-ui`) pada preview fisik Instagram.
- `DirectionAwareTabs` (`components/ui/direction-aware-tabs.tsx` dari `cult-ui`) pada tab caption dwibahasa ID & EN.
- `CopyButton` (`components/ui/copy-button.tsx` dari `cult-ui`) pada tombol salin instan caption.
- `Suggestions`, `Suggestion` (`components/ui/suggestions.tsx` dari `cult-ui`) pada quick action chips.
- `Drawer` (`components/ui/drawer.tsx` berbasis `vaul`) pada riwayat revisi poster.
- `AlertDialog` (`components/ui/alert-dialog.tsx`) pada konfirmasi persetujuan eksplisit.
- `Dialog` (`components/ui/dialog.tsx`) pada modal pemilih karya dari katalog.
- `iconoir-react` untuk seluruh ikon visual antarmuka.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 22 rute terkompilasi sempurna).
- HTTP Status check dev server (`http://localhost:3000`):
  - `/chat` -> **200 OK**
  - `/create/gen-sekar-jepun-01` -> **200 OK**
  - `/api/chat/messages` -> **200 OK**
  - `/api/generations/gen-sekar-jepun-01/review` -> **200 OK**

### Known Issues / Next Step
- Modul berikutnya: **Fase 4: Penjadwalan Kalender Konten (`SCH`, `/schedule`), Dashboard Ringkasan (`DASH`, `/dashboard`), dan Mode Juri/Demo Sandbox (`DEMO`, `/demo`)** — Selesai dikerjakan pada `[EXEC-007]`.

---

## [EXEC-007] Implementasi Fase 4 — Kalender Penjadwalan (`SCH`), Dashboard Utama (`DASH`), & Mode Juri Sandbox (`DEMO`)
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** `SCH` (Penjadwalan Instagram), `DASH` (Dashboard Ringkasan), `DEMO` (Mode Juri Sandbox)
**Tipe:** Implementation FE

### Latar Belakang
Mengimplementasikan modul operasional penutup dan penyelarasan penjurian kompetisi Bali DigiFest 2026:
1. Kalender jadwal tayang Instagram bulanan/mingguan perajin (`/schedule`).
2. Dashboard ringkasan performa dan linimasa operasional sanggar (`/dashboard`).
3. Mode Juri Sandbox dengan kartu akses instan, data seeded perajin, panduan tur alur lomba, dan tombol reset clean-start (`/demo`).

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|
| Kalender visual Maret 2026 dengan penanda waktu emas (*gold hours*) | Membantu perajin menargetkan jam aktif wisatawan mancanegara (10:00 & 18:00 WITA) sesuai F-SCH-01. | Form teks tanggal manual tanpa representasi kalender. |
| Fitur unduh paket cadangan siap-upload (F-SCH-08) | Opsi cadangan aman jika koneksi API Instagram mengalami pembatasan token, perajin tetap bisa memposting mandiri lewat HP. | Mengandalkan API murni tanpa jalur backup. |
| Integrasi `RecentActivity` dari Spectrum UI pada dashboard | Menyajikan linimasa riwayat tindakan operasional sanggar secara profesional dan modern. | Daftar teks tabel biasa. |
| Kartu "Akses Khusus Juri Lomba" pada `/demo` & Landing Page | Mengadopsi secara presisi kartu yang diberikan pengguna untuk mempermudah juri kompetisi menguji aplikasi secara instan. | Tombol login biasa. |
| Tombol reset clean-start (F-DEMO-03) dilindungi `AlertDialog` | Mencegah terhapusnya data secara tidak sengaja saat juri ingin mengulang pengujian. | Reset tanpa konfirmasi. |
| 100% `iconoir-react` & Warm Amber Design System | Konsistensi ketat di seluruh 29 rute aplikasi tanpa `lucide-react`. | Menggunakan ikon selain iconoir. |

### Routing
| Jenis | Route / Endpoint | File | Akses (public / auth / role) |
|---|---|---|---|
| Page | `/schedule` | `app/(app)/schedule/page.tsx` | Protected / Crafter / Demo Judge |
| Page | `/dashboard` | `app/(app)/dashboard/page.tsx` | Protected / Crafter / Demo Judge |
| Page | `/demo` | `app/(app)/demo/page.tsx` | Public / Demo Judge |
| API | `/api/schedule` | `app/api/schedule/route.ts` | Crafter / Demo Judge |
| API | `/api/schedule/[id]` | `app/api/schedule/[id]/route.ts` | Crafter / Demo Judge |
| API | `/api/schedule/[id]/retry` | `app/api/schedule/[id]/retry/route.ts` | Crafter / Demo Judge |
| API | `/api/dashboard/summary` | `app/api/dashboard/summary/route.ts` | Crafter / Demo Judge |
| API | `/api/demo/status` | `app/api/demo/status/route.ts` | Demo Judge |
| API | `/api/demo/reset` | `app/api/demo/reset/route.ts` | Demo Judge |

### Files Changed / Created
- `types/schedule.ts` - Tipe postingan terjadwal, status auto-post, usulan waktu terbaik, dan paket unduh cadangan.
- `types/dashboard.ts` - Tipe metrik ringkasan dashboard, status Instagram, dan item aktivitas sanggar.
- `types/demo.ts` - Tipe status sandbox demo juri dan tur pengujian kompetisi.
- `lib/query-keys.ts` - Penambahan kunci query `demo.status`.
- `components/ui/recent-activity.tsx` - Komponen linimasa aktivitas kriya diadopsi dari Spectrum UI dengan `iconoir-react`.
- `hooks/use-schedule.ts` - Hook TanStack Query untuk kalender, penjadwalan, pembatalan, dan retry auto-post.
- `hooks/use-dashboard.ts` - Hook TanStack Query untuk ringkasan metrik mingguan dan recent activity.
- `hooks/use-demo.ts` - Hook TanStack Query untuk status sandbox dan mutasi reset clean-start.
- `app/api/schedule/route.ts` - Mock route GET/POST jadwal postingan Instagram.
- `app/api/schedule/[id]/route.ts` - Mock route PATCH/DELETE penyesuaian jadwal.
- `app/api/schedule/[id]/retry/route.ts` - Mock route POST percobaan ulang posting gagal.
- `app/api/dashboard/summary/route.ts` - Mock route GET ringkasan mingguan & linimasa aktivitas.
- `app/api/demo/status/route.ts` - Mock route GET status akun juri dan data seeded.
- `app/api/demo/reset/route.ts` - Mock route POST pengembalian data ke kondisi awal bersih.
- `app/(app)/schedule/page.tsx` - Layar kalender konten Instagram dengan detail slot postingan, waktu emas, dan modal unduh paket cadangan.
- `app/(app)/dashboard/page.tsx` - Layar dashboard utama perajin dengan 4 kartu metrik, kartu aksi cepat chat AI, kartu upcoming post, dan linimasa RecentActivity.
- `app/(app)/demo/page.tsx` - Layar kendali Mode Juri Sandbox dengan kartu akses instan, panduan uji alur 4 tahap, dan dialog reset clean-start.
- `app/page.tsx` - Sinkronisasi tautan beranda dengan rute `/dashboard`, `/schedule`, dan `/demo`.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 29 rute terkompilasi sempurna).
- HTTP Status dev server:
  - `/dashboard` -> **200 OK**
  - `/schedule` -> **200 OK**
  - `/demo` -> **200 OK**
  - `/api/dashboard/summary` -> **200 OK**
  - `/api/schedule` -> **200 OK**
  - `/api/demo/status` -> **200 OK**
- Pencarian referensi `lucide-react` -> **0 temuan (bersih total)**.

### Known Issues / Next Step
- Seluruh fase utama (Fase 1 s/d Fase 4) telah selesai dibangun secara menyeluruh dari Auth, Onboarding, Profil Brand Memory, Katalog Produk, AI Chat Full-Screen, Studio Review Creative Engine, Kalender Penjadwalan, Dashboard Utama, hingga Mode Juri Sandbox. Siap untuk demonstrasi final dan penjurian Bali DigiFest 2026.

---

## [EXEC-006] Full-Screen App Shell & Spectrum UI Adoption for AI Chat Agent (`/chat`)
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** `CHAT` (Chat Agent & App Shell Layout)
**Tipe:** UI/UX Improvisation & Component Adoption

### Latar Belakang
Pengguna memberikan koreksi bahwa tampilan `/chat` sebelumnya tidak full screen (masih dibungkus dalam `max-w-5xl` dan melayang dengan ruang kosong di sekitarnya serta memunculkan scrollbar tebal Windows). Pengguna meminta integrasi pustaka baru `ui-libbrary/spectrum-ui` dengan fokus pada improvisasi UI komponen AI Chat.

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|
| Merombak `/chat` menjadi Full-Screen App Shell (`h-screen w-screen overflow-hidden flex flex-row`) | Menghilangkan ruang kosong melayang dan memberikan pengalaman produk modern kelas dunia (seperti ChatGPT/Claude). | Single pane tanpa sidebar (kurang mencakup fitur riwayat SRS F-CHAT-08). |
| Mengadopsi `ConversationList` dari Spectrum UI pada sidebar kiri | Memenuhi spesifikasi SRS F-CHAT-01 & F-CHAT-08 untuk daftar riwayat obrolan dengan pengelompokan waktu (*Hari ini*, *Kemarin*) dan fitur sematan (pin). | Sidebar teks statis biasa. |
| Mengadopsi `PromptComposer` dari Spectrum UI | Mendukung auto-grow textarea, chip lampiran karya yang bisa di-remove, dan tombol kirim spring animasi. Menempel rapi di dasar layar (*docked*). | Form input standar fixed-height. |
| Mengadopsi `ReasoningTrace` dari Spectrum UI | Wow-factor untuk juri: menampilkan akordeon proses berpikir AI dan verifikasi fakta memori kriya secara transparan. | Pesan teks biasa tanpa bukti proses berpikir. |
| Mengadopsi `ThinkingDots` dari Spectrum UI | Memberikan indikator proses asinkron titik bernapas yang elegan (F-CHAT-04), menggantikan spinner kasar. | Loading spinner default. |
| Mengadopsi `MessageActions` dari Spectrum UI | Tombol salin teks respons, regenerasi, dan umpan balik jempol langsung di bawah pesan AI. | Tanpa aksi balasan. |
| Menambahkan kelas utilitas `.no-scrollbar` di `globals.css` | Menghilangkan scrollbar abu-abu tebal bawaan Windows di Chrome/Edge secara bersih. | Membiarkan scrollbar native Windows (merusak visual). |
| 100% `iconoir-react` (nol `lucide-react`) | Menjaga kepatuhan aturan bahwa `lucide-react` dilarang keras di proyek ini. | Memakai `lucide-react` dari template Spectrum UI (ditolak keras). |

### Files Changed / Created
- `app/globals.css` - Penambahan aturan utilitas `.no-scrollbar` cross-browser (Webkit, Firefox, IE/Edge).
- `components/ui/conversation-list.tsx` - Komponen riwayat sesi chat dengan grup waktu, pin, dan pemilihan aktif (Spectrum UI).
- `components/ui/prompt-composer.tsx` - Komponen input composer modern dengan auto-grow, attachment chip, dan keyboard shortcut (Spectrum UI).
- `components/ui/thinking-dots.tsx` - Komponen loading proses asinkron titik halus (Spectrum UI).
- `components/ui/reasoning-trace.tsx` - Komponen akordeon transparansi langkah penalaran AI dan verifikasi memori (Spectrum UI).
- `components/ui/message-actions.tsx` - Komponen toolbar aksi salin, regenerasi, dan umpan balik jempol (Spectrum UI).
- `components/ui/chat-empty-state.tsx` - Komponen state kosong dengan prompt ide cepat (Spectrum UI).
- `app/(app)/chat/page.tsx` - Perombakan menyeluruh menjadi Full-Screen App Shell dengan collapsible sidebar kiri, area chat fleksibel, dan composer docked di bawah.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 22 rute terkompilasi sempurna).
- HTTP Status check dev server (`http://localhost:3000/chat`) -> **200 OK**.
- Pencarian referensi `lucide-react` di seluruh direktori `app`, `components`, `hooks`, `lib`, `types` -> **0 temuan (bersih total)**.

### Known Issues / Next Step
- Modul berikutnya: **Fase 4: Penjadwalan Kalender Konten (`SCH`, `/schedule`), Dashboard Ringkasan (`DASH`, `/dashboard`), dan Mode Juri/Demo Sandbox (`DEMO`, `/demo`)** — Selesai dikerjakan pada `[EXEC-007]`.

---

## [EXEC-007] Implementasi Fase 4 — Kalender Penjadwalan (`SCH`), Dashboard Utama (`DASH`), & Mode Juri Sandbox (`DEMO`)
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** `SCH` (Penjadwalan Instagram), `DASH` (Dashboard Ringkasan), `DEMO` (Mode Juri Sandbox)
**Tipe:** Implementation FE

### Latar Belakang
Mengimplementasikan modul operasional penutup dan penyelarasan penjurian kompetisi Bali DigiFest 2026:
1. Kalender jadwal tayang Instagram bulanan/mingguan perajin (`/schedule`).
2. Dashboard ringkasan performa dan linimasa operasional sanggar (`/dashboard`).
3. Mode Juri Sandbox dengan kartu akses instan, data seeded perajin, panduan tur alur lomba, dan tombol reset clean-start (`/demo`).

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|
| Kalender visual Maret 2026 dengan penanda waktu emas (*gold hours*) | Membantu perajin menargetkan jam aktif wisatawan mancanegara (10:00 & 18:00 WITA) sesuai F-SCH-01. | Form teks tanggal manual tanpa representasi kalender. |
| Fitur unduh paket cadangan siap-upload (F-SCH-08) | Opsi cadangan aman jika koneksi API Instagram mengalami pembatasan token, perajin tetap bisa memposting mandiri lewat HP. | Mengandalkan API murni tanpa jalur backup. |
| Integrasi `RecentActivity` dari Spectrum UI pada dashboard | Menyajikan linimasa riwayat tindakan operasional sanggar secara profesional dan modern. | Daftar teks tabel biasa. |
| Kartu "Akses Khusus Juri Lomba" pada `/demo` & Landing Page | Mengadopsi secara presisi kartu yang diberikan pengguna untuk mempermudah juri kompetisi menguji aplikasi secara instan. | Tombol login biasa. |
| Tombol reset clean-start (F-DEMO-03) dilindungi `AlertDialog` | Mencegah terhapusnya data secara tidak sengaja saat juri ingin mengulang pengujian. | Reset tanpa konfirmasi. |
| 100% `iconoir-react` & Warm Amber Design System | Konsistensi ketat di seluruh 29 rute aplikasi tanpa `lucide-react`. | Menggunakan ikon selain iconoir. |

### Routing
| Jenis | Route / Endpoint | File | Akses (public / auth / role) |
|---|---|---|---|
| Page | `/schedule` | `app/(app)/schedule/page.tsx` | Protected / Crafter / Demo Judge |
| Page | `/dashboard` | `app/(app)/dashboard/page.tsx` | Protected / Crafter / Demo Judge |
| Page | `/demo` | `app/(app)/demo/page.tsx` | Public / Demo Judge |
| API | `/api/schedule` | `app/api/schedule/route.ts` | Crafter / Demo Judge |
| API | `/api/schedule/[id]` | `app/api/schedule/[id]/route.ts` | Crafter / Demo Judge |
| API | `/api/schedule/[id]/retry` | `app/api/schedule/[id]/retry/route.ts` | Crafter / Demo Judge |
| API | `/api/dashboard/summary` | `app/api/dashboard/summary/route.ts` | Crafter / Demo Judge |
| API | `/api/demo/status` | `app/api/demo/status/route.ts` | Demo Judge |
| API | `/api/demo/reset` | `app/api/demo/reset/route.ts` | Demo Judge |

### Files Changed / Created
- `types/schedule.ts` - Tipe postingan terjadwal, status auto-post, usulan waktu terbaik, dan paket unduh cadangan.
- `types/dashboard.ts` - Tipe metrik ringkasan dashboard, status Instagram, dan item aktivitas sanggar.
- `types/demo.ts` - Tipe status sandbox demo juri dan tur pengujian kompetisi.
- `lib/query-keys.ts` - Penambahan kunci query `demo.status`.
- `components/ui/recent-activity.tsx` - Komponen linimasa aktivitas kriya diadopsi dari Spectrum UI dengan `iconoir-react`.
- `hooks/use-schedule.ts` - Hook TanStack Query untuk kalender, penjadwalan, pembatalan, dan retry auto-post.
- `hooks/use-dashboard.ts` - Hook TanStack Query untuk ringkasan metrik mingguan dan recent activity.
- `hooks/use-demo.ts` - Hook TanStack Query untuk status sandbox dan mutasi reset clean-start.
- `app/api/schedule/route.ts` - Mock route GET/POST jadwal postingan Instagram.
- `app/api/schedule/[id]/route.ts` - Mock route PATCH/DELETE penyesuaian jadwal.
- `app/api/schedule/[id]/retry/route.ts` - Mock route POST percobaan ulang posting gagal.
- `app/api/dashboard/summary/route.ts` - Mock route GET ringkasan mingguan & linimasa aktivitas.
- `app/api/demo/status/route.ts` - Mock route GET status akun juri dan data seeded.
- `app/api/demo/reset/route.ts` - Mock route POST pengembalian data ke kondisi awal bersih.
- `app/(app)/schedule/page.tsx` - Layar kalender konten Instagram dengan detail slot postingan, waktu emas, dan modal unduh paket cadangan.
- `app/(app)/dashboard/page.tsx` - Layar dashboard utama perajin dengan 4 kartu metrik, kartu aksi cepat chat AI, kartu upcoming post, dan linimasa RecentActivity.
- `app/(app)/demo/page.tsx` - Layar kendali Mode Juri Sandbox dengan kartu akses instan, panduan uji alur 4 tahap, dan dialog reset clean-start.
- `app/page.tsx` - Sinkronisasi tautan beranda dengan rute `/dashboard`, `/schedule`, dan `/demo`.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 29 rute terkompilasi sempurna).
- HTTP Status dev server:
  - `/dashboard` -> **200 OK**
  - `/schedule` -> **200 OK**
  - `/demo` -> **200 OK**
  - `/api/dashboard/summary` -> **200 OK**
  - `/api/schedule` -> **200 OK**
  - `/api/demo/status` -> **200 OK**
- Pencarian referensi `lucide-react` -> **0 temuan (bersih total)**.

### Known Issues / Next Step
- Seluruh fase utama (Fase 1 s/d Fase 4) telah selesai dibangun secara menyeluruh dari Auth, Onboarding, Profil Brand Memory, Katalog Produk, AI Chat Full-Screen, Studio Review Creative Engine, Kalender Penjadwalan, Dashboard Utama, hingga Mode Juri Sandbox. Siap untuk demonstrasi final dan penjurian Bali DigiFest 2026.


---

## [EXEC-008] Phase 5 Implementation: Weekly Tasks (/tasks), Poster Gallery (/gallery), and Balinese Cultural Moments (/moments)
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** Phase 5 — Tasks, Gallery, & Cultural Moments (SRS_TSK_FE, SRS_GAL_FE, SRS_EVT_FE)
**Tipe:** Implementation FE & UX Polish

### Latar Belakang
Menyelesaikan sisa modul spesifikasi fungsional platform Kriya Mantra:
1. `SRS_TSK_FE.md` ➔ `/tasks` (Tugas Mingguan & Kebiasaan Pemasaran Perajin)
2. `SRS_GAL_FE.md` ➔ `/gallery` (Galeri Portofolio Poster Kriya Terbit & Siap Unduh)
3. `SRS_EVT_FE.md` ➔ `/moments` (Kalender Ritme Kultural Bali & Pameran Bali DigiFest 2026)
Serta menyelesaikan keluhan visual chat terkait pemotongan konten opsi poster dan scrollbar abu-abu Windows bawaan.

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|
| Adopsi `TaskCheckbox` dari Spectrum UI dengan aksen confetti Warm Amber | Memberikan sensasi pencapaian visual (*dopamine hit*) setiap kali perajin menyelesaikan rutinitas harian. | Checkbox HTML standar (kering dan membosankan bagi perajin). |
| Adopsi `TaskRows` dari Spectrum UI untuk otomatisasi AI latar belakang | Menampilkan transparansi sistem AI (sinkronisasi kalender, penjagaan kuota, cek konsistensi memori). | Hanya teks statis tanpa indikator status dinamis. |
| Adopsi `TiltCard` dari Spectrum UI untuk etalase `/gallery` | Efek 3D tilt interaktif menonjolkan tekstur dan kemewahan kain wastra tradisional layaknya etalase seni premium. | Grid kartu datar biasa. |
| Integrasi 1-Click CTA dari `/moments` ke `/chat` dengan *pre-filled prompt* | Memudahkan perajin membuat konten relevan tanpa harus mengetik instruksi rumit dari awal. | Navigasi manual tanpa penyertaan konteks momen budaya. |
| Pembersihan scrollbar global via `@utility no-scrollbar` dan styling ramping webkit | Menghilangkan scrollbar default Windows 95 yang mengganggu estetika pada bilah saran (*suggestion chips*). | Membiarkan scrollbar native browser. |
| Nol ketergantungan `lucide-react`, murni `iconoir-react` | Menjaga konsistensi paket ikon kriya tanpa bloatware. | Mengimpor Lucide (dilarang). |

### Routing
| Jenis | Route / Endpoint | File | Akses (public / auth / role) |
|---|---|---|---|
| Page | `/tasks` | `app/(app)/tasks/page.tsx` | Crafter / Authenticated |
| Page | `/gallery` | `app/(app)/gallery/page.tsx` | Crafter / Authenticated |
| Page | `/moments` | `app/(app)/moments/page.tsx` | Crafter / Authenticated |
| Page | `/events` | `app/(app)/events/page.tsx` | Redirect ke `/moments` |
| API | `/api/tasks/weekly` | `app/api/tasks/weekly/route.ts` | Crafter / Authenticated |
| API | `/api/gallery` | `app/api/gallery/route.ts` | Crafter / Authenticated |
| API | `/api/moments` | `app/api/moments/route.ts` | Crafter / Authenticated |

### Files Changed / Created
- `types/task.ts` - Tipe tugas pemasaran, prioritas, kategori, dan progres mingguan.
- `types/gallery.ts` - Tipe poster tersimpan, rasio aspek (4:5, 9:16), status terbit, dan jangkauan est.
- `types/moment.ts` - Tipe momen kultural Bali, hitungan hari mundur, tips promosi, dan prompt rujukan.
- `lib/query-keys.ts` - Penambahan kunci query `gallery.list` dan `gallery.detail`.
- `components/ui/task-checkbox.tsx` - Komponen TaskCheckbox diadopsi dari Spectrum UI dengan perayaan Warm Amber.
- `components/ui/task-rows.tsx` - Komponen linimasa status tugas AI latar belakang dari Spectrum UI dengan `iconoir-react`.
- `components/ui/tilt-card.tsx` - Komponen 3D tilt perspective card dari Spectrum UI untuk etalase poster.
- `hooks/use-tasks.ts` - Hook TanStack Query untuk memuat tugas dan mutasi optimistik toggle selesai.
- `hooks/use-gallery.ts` - Hook TanStack Query untuk arsip poster kriya dan mutasi hapus.
- `hooks/use-moments.ts` - Hook TanStack Query untuk kalender ritme budaya Bali.
- `app/api/tasks/weekly/route.ts` - Mock API tugas mingguan sanggar.
- `app/api/gallery/route.ts` - Mock API galeri materi visual kriya.
- `app/api/moments/route.ts` - Mock API kalender perayaan Bali Maret - April 2026.
- `app/(app)/tasks/page.tsx` - Layar tugas mingguan perajin dengan kartu kemajuan, filter kategori, checkbox Spectrum UI, dan linimasa otomasi AI.
- `app/(app)/gallery/page.tsx` - Layar etalase poster interaktif 3D tilt, filter rasio, modal detail dwibahasa, tombol unduh dan salin caption.
- `app/(app)/moments/page.tsx` - Layar kalender budaya Bali dengan kartu inspirasi, tips pemasaran praktis perajin, dan 1-click CTA ke AI chat.
- `app/(app)/events/page.tsx` - Halaman pengalihan rute `/events` menuju `/moments`.
- `app/(app)/chat/page.tsx` - Penambahan tautan sidebar `/tasks`, `/gallery`, `/moments`, penanganan parameter query `?prompt=`, auto-scroll timer, dan pelebaran kontainer ke `max-w-5xl`.
- `app/page.tsx` - Penambahan navigasi navbar utama ke seluruh modul aplikasi baru.
- `app/globals.css` - Deklarasi `@utility no-scrollbar` dan custom slim scrollbar webkit.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 36 rute terkompilasi sempurna).
- HTTP Status dev server:
  - `/tasks` -> **200 OK**
  - `/gallery` -> **200 OK**
  - `/moments` -> **200 OK**
  - `/api/tasks/weekly` -> **200 OK**
  - `/api/gallery` -> **200 OK**
  - `/api/moments` -> **200 OK**
- Pemeriksaan dependensi: **0 impor `lucide-react`** di seluruh kode baru.


---

## [EXEC-009] Bug Fixes: Button Overlapping, Hydration Error, Textarea Outline, and Official Logo Application
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** Cross-cutting UI/UX Polish & Bug Fixes
**Tipe:** Bug Fix & Brand Consistency

### Latar Belakang
Pengguna menemukan tiga permasalahan:
1. **Button Overlapping:** Tombol unduh poster di modal galeri bertumpukan (*overlap*) dengan tombol "Buka di Studio" akibat *grid-cols-2* sempit dengan teks panjang *whitespace-nowrap*.
2. **Hydration Error:** Pesan konsol Next.js `In HTML, <button> cannot be a descendant of <button>` pada `ConversationList` di mana tombol sematan (*pin*) berada di dalam elemen tombol baris obrolan.
3. **Brand Logo & Textarea Outline:** Pengguna mengeluhkan adanya kotak oranye kaku pada textarea composer, serta meminta penggantian placeholder logo kotak dengan logo resmi Kriya Mantra (`logo-nav.svg`).

### Perubahan dan Perbaikan
1. **Modal Galeri (`app/(app)/gallery/page.tsx`):**
   - Mengubah layout tombol dari `grid grid-cols-2` menjadi responsif `flex flex-col sm:flex-row items-center gap-2.5`.
   - Menggunakan `Button asChild` murni tanpa nesting tag ganda.
   - Mengganti teks label menjadi padat dan jelas: *"Unduh Poster (HD)"* dan *"Buka di Studio"*.
2. **Daftar Obrolan (`components/ui/conversation-list.tsx`):**
   - Memisahkan tombol sematan (*pin*) menjadi elemen saudara (*sibling*) dengan posisi absolut di samping tombol obrolan utama.
   - Menghilangkan nesting `<button>` di dalam `<button>` secara tuntas sehingga bebas dari hydration error.
3. **Pembersihan Outline Textarea (`app/globals.css` & `components/ui/prompt-composer.tsx`):**
   - Meniadakan `outline` default pada `textarea:focus` dan `textarea:focus-visible` agar tidak menghasilkan kotak oranye kaku ganda di dalam composer.
4. **Penerapan Logo Resmi Kriya Mantra (`logo-nav.svg`):**
   - Mengganti seluruh placeholder inisial kotak dengan `Image` beresolusi tajam `public/assets/brand/logo-nav.svg` pada:
     - Navbar Beranda (`app/page.tsx`)
     - Panel Samping Chat (`app/(app)/chat/page.tsx`)
     - Halaman Masuk / Login (`app/(public)/login/page.tsx`)
     - Halaman Daftar / Register (`app/(public)/register/page.tsx`)

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 36 rute terkompilasi sempurna).
- Tidak ada error hydrasi atau nesting tag ilegal.


---

## [EXEC-010] Comprehensive Brand Logo Fix: Complete Elimination of "KM" Circle Placeholders
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** Brand Consistency & Visual Assets
**Tipe:** Asset Replacement

### Latar Belakang
Pengguna menemukan bahwa lingkaran oranye dengan inisial "KM" masih muncul di navbar landing page dan form auth karena penggantian regex sebelumnya terhambat perbedaan newline file. Pengguna meminta seluruh logo diganti tanpa terkecuali menggunakan `logo-nav.svg`.

### Perubahan dan Hasil
1. **Pemeriksaan Menyeluruh Seluruh Berkas:**
   - Ditemukan 3 berkas yang masih menyisakan inisial placeholder "KM": `app/page.tsx`, `app/(public)/login/page.tsx`, dan `app/(public)/register/page.tsx`.
2. **Penerapan Logo Resmi:**
   - `app/page.tsx`: Digantikan dengan `<Image src="/assets/brand/logo-nav.svg" alt="Kriya Mantra" width={160} height={52} className="h-8 w-auto object-contain" priority />` pada navbar dan `logo-footer.svg` pada footer.
   - `app/(public)/login/page.tsx`: Digantikan dengan `logo-nav.svg`.
   - `app/(public)/register/page.tsx`: Digantikan dengan `logo-nav.svg`.
   - `app/(app)/chat/page.tsx`: Telah terverifikasi menggunakan `logo-nav.svg`.
3. **Hasil Pencarian Akhir:**
   - Pemindaian regex string `"KM"` di seluruh folder `app` dan `components` menghasilkan 0 temuan logo placeholder (hanya tersisa kata "produkmu" dan "UMKM").

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 36 rute terkompilasi sempurna).


---

## [EXEC-011] Studio Preview Differentiation: Native Instagram Story (9:16) vs Feed (4:5)
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** Creative Engine Studio (`app/(app)/create/[id]/page.tsx`)
**Tipe:** UX Polish & Feature Refinement

### Latar Belakang
Pengguna memberikan masukan visual: pada mode Instagram Story (9:16), tampilan mockup smartphone tidak seharusnya memuat elemen Feed seperti header postingan atau blok teks caption panjang di bawah. Mode Story harus murni menampilkan visual vertikal penuh sesuai antarmuka asli Instagram Story.

### Perubahan dan Hasil
1. **Diferensiasi Antarmuka Smartphone Mockup (`app/(app)/create/[id]/page.tsx`):**
   - **Mode Feed (4:5):**
     - Mempertahankan header Feed Instagram (avatar profil, lokasi Klungkung Bali, logo Instagram).
     - Rasio poster 4:5.
     - Footer postingan lengkap dengan tombol suka, bagikan, dan teks caption dwibahasa aktif.
   - **Mode Story (9:16):**
     - Karya poster 9:16 tampil **penuh edge-to-edge** (`absolute inset-0`).
     - **Overlay Atas:** Bilah progres segmen Story tipis putih, cincin gradien avatar profil Instagram, nama akun `sekarjepun_endek`, waktu `2j`, badge `DigiFest 2026`, dan tombol tutup `Xmark`.
     - **Teks Caption Feed:** Dihilangkan sepenuhnya dari dalam layar Story (karena Story Instagram murni mengandalkan visual instan).
     - **Overlay Bawah:** Bilah interaksi asli Instagram Story berupa pil balasan *"Kirim pesan..."*, ikon suka (*Heart*), dan ikon kirim (*Send*), disertai label kepatuhan AI etis.
2. **Keterangan Workbench Kolom Kanan:**
   - Badge caption dwibahasa di workbench diberi status kontekstual: *"Disimpan untuk Feed & Arsip"* saat mode Story dipilih.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 36 rute terkompilasi sempurna).
- Antarmuka Instagram Story (9:16) kini 100% otentik dan bersih dari blok caption Feed.


---

## [EXEC-012] Template Purge: Complete Removal of Spotify / RY X Music Player in iPhone Component
**Tanggal:** 2026-11-03
**Status:** Done
**Module:** Component Library (`components/ui/apple-iphone-17-pro.tsx`)
**Tipe:** Template Cleanup & Bug Fix

### Latar Belakang
Pengguna menemukan bahwa saat mengklik layar simulator smartphone, Dynamic Island secara otomatis membesar dan menampilkan sisa template dummy pemutar musik Spotify ("RY X - Let You Go"). Sisa template tersebut sama sekali tidak berkaitan dengan platform Kriya Mantra.

### Perubahan dan Hasil
1. **Pembersihan Komponen `apple-iphone-17-pro.tsx`:**
   - Menghapus fungsi pemicu `handleDynamicIslandTap` dari event `onClick` layar ponsel. Mengklik layar ponsel tidak lagi memicu ekspansi Dynamic Island.
   - Menghapus seluruh komponen bawaan pemutar musik: `DefaultDynamicIslandContent`, `SpotifyAppIcon`, `SpotifyLogoMark`, `PauseWithProgressRing`, `MiniWaveform`, dan `ISLAND_ART`.
   - Menghapus impor ikon yang tidak terpakai (`AudioLines`, `Mic`, `Music`, `Pause`, `Play`, `SkipBack`, `SkipForward`, `AlignJustify`).
   - Dynamic Island kini murni berfungsi sebagai guntingan perangkat keras kamera fisik (*hardware camera cutout*) yang elegan dan statis.
2. **Pemeriksaan Kode:**
   - Pemindaian teks "RY X", "Spotify", dan "Let You Go" menghasilkan **0 temuan** di seluruh repositori.

### Verification
- `npm run typecheck` (`tsc --noEmit`) - passed (exit code 0, 0 error).
- `npm run build` (`next build` Turbopack) - passed (exit code 0, 36 rute terkompilasi sempurna).
