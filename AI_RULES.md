# AI RULES — Web Builder

Dokumen ini adalah aturan WAJIB untuk AI Web Builder. Semua aturan bersifat mengikat. Jika ada konflik antara permintaan ad-hoc dan aturan ini, AI harus menjelaskan konfliknya terlebih dahulu sebelum melanjutkan.

> Catatan penyesuaian: path folder di bawah (mis. `/docs/`, `/ui-library/`, `/skills/`) adalah default. Sesuaikan dengan struktur workspace sebenarnya.

---

## 0. Urutan Eksekusi (Ringkasan)

Setiap kali AI menerima tugas, urutannya selalu:

1. **Pelajari Skills** yang tersedia (Aturan 4)
2. **Baca Docs workspace**: Project Context → PRD → SRS (Aturan 1)
3. **Cek kelengkapan docs** → jika SRS belum ada, buat SRS (Aturan 2)
4. **Pelajari UI Library** (Aturan 3)
5. **Implementasi** sesuai SRS
6. **Tambahkan entri Execution Log** (Aturan 5)

AI dilarang melompat ke implementasi sebelum langkah 1–4 selesai.

---

## 1. Wajib Membaca Docs Terlebih Dahulu

Workspace sudah distandarisasi. AI WAJIB membaca dokumen berikut sebelum melakukan apa pun, dengan urutan:

| Urutan | Dokumen | Fungsi |
|---|---|---|
| 1 | **Project Context** | Tujuan proyek, target user, batasan, istilah domain |
| 2 | **PRD** | Daftar fitur, user story, acceptance criteria, scope |
| 3 | **SRS** | Spesifikasi teknis per fitur (FE dan BE terpisah) |

Aturan:
- AI tidak boleh berasumsi isi dokumen. Jika dokumen tidak ditemukan atau tidak terbaca, AI harus melapor ke user, bukan menebak.
- Seluruh keputusan (nama fitur, istilah, alur, scope) harus konsisten dengan dokumen ini.
- Jika ada ketidakkonsistenan antar dokumen (mis. PRD vs Project Context), AI harus menandainya dan bertanya ke user sebelum lanjut.
- Jika permintaan user di luar scope PRD, AI harus memberi tahu bahwa fitur tersebut tidak ada di PRD, dan menyarankan update PRD lebih dulu.

---

## 2. Pembuatan SRS (Jika Belum Ada)

### 2.1 Kondisi Pemicu

| Kondisi | Tindakan |
|---|---|
| SRS sudah ada | Gunakan SRS yang ada. Jangan dibuat ulang. |
| SRS belum ada, PRD dan/atau Project Context ada | **Wajib membuat SRS** sesuai aturan 2.2–2.8 |
| PRD belum ada | Jangan membuat SRS. Laporkan ke user bahwa PRD dibutuhkan. |

### 2.2 Template Wajib

- AI WAJIB meniru struktur, urutan section, gaya penulisan, dan level detail dari file contoh:
  - `SRS_01_(CONTOH SRS1).md`
  - `SRS_02_(CONTOH SRS2).md`
- File contoh ini diinisiasi oleh user di tiap project. Jika kedua file tidak ditemukan di project, AI harus berhenti dan meminta user menyediakannya. AI dilarang membuat template sendiri.
- Jangan menghapus, menggabung, atau mengganti nama section template tanpa alasan tertulis di Execution Log.

### 2.3 Dokumen Tech Stack

Sebelum menulis SRS fitur, AI harus memastikan ada dokumen **Tech Stack**:

- Jika PRD / Project Context sudah menyebut tech stack → ambil, rapikan, dan tuangkan ke dokumen Tech Stack.
- Jika tidak disebut → AI merancang tech stack dari nol berdasarkan kebutuhan PRD, mencakup:
  - Frontend (framework, bahasa, state management, styling, form/validation, data fetching)
  - Backend (runtime/framework, bahasa, arsitektur, auth)
  - Database dan ORM
  - API style (REST/GraphQL), format response
  - Infrastruktur dasar (hosting, env, CI/CD jika relevan)
  - Testing
- Setiap pilihan harus disertai **alasan** (mengapa dipilih, alternatif yang dipertimbangkan).
- Tech stack yang dirancang dari nol wajib ditandai "USULAN" dan dikonfirmasi user sebelum SRS fitur difinalkan.

### 2.4 Pembagian SRS: Per Fitur, Lalu Dipisah FE dan BE

- SRS dibuat **per fitur** sesuai daftar fitur di PRD. Satu fitur PRD = satu pasang SRS.
- Setiap fitur menghasilkan **dua dokumen terpisah**:
  - `SRS_<nomor>_<nama-fitur>_FE.md` (Frontend)
  - `SRS_<nomor>_<nama-fitur>_BE.md` (Backend)
- FE dan BE **tidak boleh disatukan** dalam satu file. Tujuannya agar dua orang dapat mengerjakan FE dan BE secara paralel hanya dengan membaca dokumennya masing-masing.
- Setiap SRS harus **berdiri sendiri** (self-contained): pengembang tidak perlu membaca SRS lawannya untuk bekerja, kecuali pada bagian kontrak API yang sengaja dibuat identik di kedua dokumen (lihat 2.6).

### 2.5 Isi Minimal SRS FE

- Ringkasan fitur dan referensi ke bagian PRD yang terkait
- Daftar halaman/route dan struktur navigasi
- Breakdown UI: layout, section, komponen (dari UI Library, lihat Aturan 3), state (loading, empty, error, success)
- UX flow dan perilaku interaksi (klik, validasi, feedback, redirect)
- Spesifikasi form: field, tipe, aturan validasi, pesan error
- State management dan data flow
- Integrasi API: endpoint yang dipanggil, request/response, penanganan error
- Responsive behavior dan aksesibilitas
- Struktur folder, penamaan file/komponen, konvensi kode
- Edge case dan acceptance criteria
- Checklist implementasi

### 2.6 Isi Minimal SRS BE

- Ringkasan fitur dan referensi ke PRD
- Daftar endpoint: method, path, deskripsi, auth/role
- Request: header, params, query, body (tipe, wajib/opsional, validasi)
- Response: sukses dan seluruh error (kode HTTP, struktur body, contoh JSON)
- Skema database: tabel/koleksi, kolom, tipe, constraint, index, relasi
- Business logic dan alur proses, langkah demi langkah
- Autentikasi, otorisasi, dan permission
- Penanganan error dan kode error standar
- Struktur folder (controller/service/repository/dsb.), penamaan, konvensi kode
- Edge case, keamanan, rate limit jika relevan
- Acceptance criteria dan checklist implementasi

**Kontrak API**: bagian request/response endpoint harus **identik** antara SRS FE dan SRS BE untuk fitur yang sama. Ini kunci agar wiring FE–BE cepat. Jika berbeda, itu dianggap bug dokumen.

### 2.7 Standardisasi Codebase (Wajib Ada di Setiap SRS)

Agar wiring FE–BE cepat, SRS harus memuat standar codebase yang konsisten antar fitur, minimal:

- **Struktur folder** FE dan BE (pohon direktori lengkap)
- **Konvensi penamaan**: file, folder, komponen, fungsi, variabel, endpoint, tabel, kolom
- **Format response API standar** (envelope sukses dan error) yang dipakai seluruh fitur
- **Daftar kode error standar** dan pemetaan ke pesan UI
- **Konvensi pemanggilan API** di FE (lokasi service/client, hooks, penamaan)
- **Konvensi validasi** (skema yang sama atau ekuivalen antara FE dan BE)
- **Konvensi auth/token** dan penanganannya
- **Konvensi env variable**
- **Tipe/DTO bersama**: nama dan bentuk data harus sama di FE dan BE

Standar ini harus **sama persis** di semua SRS dalam satu project. Jika sudah didefinisikan di SRS fitur pertama atau di dokumen Tech Stack, SRS berikutnya merujuk dan mengikutinya, bukan membuat variasi baru.

### 2.8 Kedalaman dan Panjang

- Tingkat detail: **sedetail mungkin**. Developer lain harus bisa langsung mengerjakan tanpa bertanya.
- Target: **minimal 150 baris per dokumen**, FE dan BE masing-masing.
- 150 baris adalah hasil dari detail yang nyata, **bukan hasil padding**. Dilarang menambah baris dengan pengulangan, kalimat kosong, atau spasi berlebihan. Jika fitur memang kompleks, dokumen boleh jauh lebih panjang. Jika setelah detail penuh dokumen kurang dari 150 baris, AI harus meninjau kembali apakah ada bagian yang terlewat (edge case, error state, validasi, skema), bukan menambah isian palsu.
- Gunakan tabel, contoh JSON, pohon direktori, dan contoh konkret untuk memperjelas.

### 2.9 Hal yang Dilarang pada SRS

- Menulis SRS yang tidak mengacu ke PRD
- Menambah fitur yang tidak ada di PRD
- Menyatukan FE dan BE dalam satu file
- Menggunakan placeholder seperti "TBD", "dst.", "sesuai kebutuhan" tanpa penjelasan. Jika ada yang tidak diketahui, tulis sebagai **Open Question** dan tanyakan ke user.
- Menyimpang dari struktur template contoh

---

## 3. Aturan UI Library (KETAT)

User sudah meng-clone repo UI library ke workspace. Peran AI di sisi UI **hanya**:

> **Templating dan implementasi UI memakai komponen yang sudah ada di UI library.**

Aturan:

1. AI WAJIB mempelajari UI library terlebih dahulu: daftar komponen, props, variant, contoh pemakaian, token/tema, dan struktur foldernya.
2. AI **HANYA BOLEH** memakai komponen dari UI library. **DILARANG membuat komponen dari nol.**
3. Ini berlaku untuk semua jenis komponen, termasuk **chart, tabel, modal, form, card, navigasi, dan lainnya**. Contoh: chart harus dari komponen chart di UI library, bukan membuat sendiri atau menginstal library chart lain.
4. DILARANG menginstal library UI/komponen pihak ketiga sebagai pengganti.
5. DILARANG menyalin lalu memodifikasi komponen library menjadi komponen baru, atau meng-override style secara berlebihan untuk menyiasati.
6. Gunakan token desain (warna, spacing, tipografi) dari UI library. Dilarang hardcode nilai styling yang sudah ada tokennya.
7. Jika komponen yang dibutuhkan **tidak tersedia**:
   - Berhenti pada bagian tersebut
   - Laporkan ke user: komponen apa yang dibutuhkan, di halaman/fitur mana, dan alternatif komposisi dari komponen yang ada (jika ada)
   - Tunggu keputusan user. Jangan membuat sendiri.
8. Komponen halaman (layout, page wrapper) boleh dibuat hanya sebagai **komposisi** dari komponen library, tanpa menciptakan elemen UI baru.
9. Setiap komponen yang dipakai pada SRS FE harus dicantumkan **nama komponen aslinya** dari UI library.

---

## 4. Wajib Mempelajari Skills

- Sebelum mengerjakan tugas apa pun, AI WAJIB melihat daftar skill yang tersedia dan membaca skill yang relevan.
- Jika tugasnya cocok dengan sebuah skill, AI wajib mengikuti instruksi skill tersebut.
- Jika skill bertabrakan dengan aturan di dokumen ini, AI melaporkan ke user. Aturan UI Library (Aturan 3) dan aturan SRS (Aturan 2) tetap menang kecuali user menyatakan lain.
- Di entri Execution Log (bagian Skills dan Docs yang Dibaca), AI mencatat skill apa saja yang dibaca dan dipakai.

---

## 5. Log Eksekusi SRS (Wajib untuk Handover)

Setiap selesai mengerjakan SRS (membuat SRS maupun implementasi), AI WAJIB menambahkan satu entri ke file log tunggal:

`docs/EXECUTION_LOG.md` (sesuaikan path dengan workspace)

### 5.1 Aturan Penulisan Entri

- Satu pekerjaan = satu entri. Entri **ditambahkan di akhir (append)**, entri lama tidak boleh dihapus atau ditimpa.
- ID berurutan: `EXEC-001`, `EXEC-002`, dst. AI wajib membaca ID terakhir di log sebelum menentukan ID baru.
- Judul entri: `## [EXEC-NNN] Judul Singkat Pekerjaan`
- Log harus jujur dan berbasis bukti. Dilarang mengklaim "Done" jika ada bagian yang belum selesai. Tulis `Partial` dan jelaskan sisanya di Known Issues.
- Jika log menemukan klaim status yang berlebihan di dokumen SRS lama, AI wajib mengoreksi status di SRS tersebut dan mencatatnya di bagian Files Changed.
- Log harus bisa dipahami developer lain tanpa konteks percakapan.

### 5.2 Format Entri Wajib

```markdown
## [EXEC-NNN] Judul Singkat
**Tanggal:** YYYY-MM-DD
**Status:** Done | Partial (jelaskan singkat apa yang masih pending) | Blocked
**Module:** Nama modul / fitur (mis. Document Drive / RBAC)
**Tipe:** Jenis pekerjaan (mis. SRS Creation FE, SRS Creation BE, Implementation FE, Implementation BE, Bugfix, Security)

### Latar Belakang
Masalah atau kebutuhan yang mendasari pekerjaan, rujukan ke PRD/SRS, dan hasil audit awal jika ada.

### Keputusan dan Alasan
| Keputusan | Alasan | Alternatif yang dipertimbangkan |
|---|---|---|

### Routing
Semua route/endpoint yang dibuat, diubah, atau terdampak.
| Jenis | Route / Endpoint | File | Akses (public / auth / role) |
|---|---|---|---|
(Jika tidak ada routing yang terdampak, tulis: "Tidak ada perubahan routing".)

### Files Changed
- `path/file` - penjelasan singkat apa yang berubah dan mengapa.

### UI Library yang Dipakai
- Daftar komponen UI library yang dipakai dan di halaman mana.
- Komponen yang dibutuhkan tetapi tidak tersedia (dilaporkan, tidak dibuat sendiri).
(Hapus bagian ini jika pekerjaan murni BE.)

### Acceptance Evidence
- Daftar perilaku yang bisa diverifikasi (observable), dari sudut pandang user/API.

### Verification
- Perintah yang dijalankan dan hasilnya (mis. `npx tsc --noEmit` - passed).
- Jika tidak ada yang dijalankan, tulis jelas bahwa belum diverifikasi.

### Skills dan Docs yang Dibaca
- Skill yang dipelajari dan dipakai
- Docs yang dirujuk (Project Context, PRD, SRS, Tech Stack)

### Known Issues / Next Step
- Hal yang belum selesai, risiko, asumsi, Open Questions, dan langkah selanjutnya untuk handover.
```

### 5.3 Contoh Entri Acuan

Entri `[EXEC-052] Public Document Drive Isolation and File Proxy` pada log project dipakai sebagai acuan gaya penulisan: padat, spesifik per file, evidence yang bisa diverifikasi, dan Known Issues yang jujur. AI wajib meniru tingkat kedetailan dan kejujuran tersebut.

### 5.4 Catatan Bahasa

Struktur heading menggunakan format di atas (campuran Indonesia-Inggris sesuai konvensi project). Isi penjelasan boleh Indonesia atau Inggris, tetapi harus konsisten dalam satu entri dan nama teknis (file, route, tabel) ditulis apa adanya.

---

## 6. Perilaku Umum AI

- Jangan berasumsi. Jika informasi tidak cukup, tanyakan atau catat sebagai Open Question.
- Jangan keluar dari scope PRD.
- Jangan membuat ulang dokumen yang sudah ada kecuali diminta.
- Jangan menimpa dokumen user tanpa konfirmasi.
- Pertahankan konsistensi istilah dan penamaan di seluruh dokumen dan kode.
- Laporkan hasil secara ringkas: apa yang selesai, apa yang tertunda, apa yang butuh keputusan user.

---

## 7. Checklist Sebelum Menyatakan Selesai

- [ ] Skill relevan sudah dibaca
- [ ] Project Context, PRD, dan SRS (jika ada) sudah dibaca
- [ ] SRS dibuat dari template contoh (jika sebelumnya belum ada)
- [ ] Tech Stack terdokumentasi (dan dikonfirmasi jika dirancang dari nol)
- [ ] SRS per fitur, FE dan BE dipisah
- [ ] Setiap SRS detail, minimal 150 baris tanpa padding
- [ ] Standardisasi codebase tercantum dan konsisten antar SRS
- [ ] Kontrak API FE dan BE identik
- [ ] Semua UI hanya memakai komponen UI library (tanpa komponen buatan sendiri)
- [ ] Komponen yang tidak tersedia sudah dilaporkan, bukan dibuat sendiri
- [ ] Entri baru ditambahkan ke EXECUTION_LOG.md (ID berurutan), lengkap dengan alasan, routing, evidence, verification, dan Known Issues jujur


### NOTE: 

- Pelajari dokumentasi yang ada untuk tahu bagaimana cara menentukan penggunaan component dengan membaca \HOW TO USE COMPONENT. Lalu pelajari seluruh .md yang ada di /ui-libbrary/*

- Ini ada contoh mempelajari/pengimplementasian component "kamu bakal cari manual, lalu copy, misal, ada color picker, nah lalu aku cari di ui-libbrary, nah ketemu nih ada \ui-libbrary\heroui\apps\docs\src\components\color-picker\color-picker.tsx, nah lalu aku pelajari cara implementasiannya"

- Selalu pahami design.md (jika ada), harus menggunakan design system yang sudah ada

- Improvisasi penggunaan warna tidak terkekang dengan aturan tidak boleh buat component dari 0

- Selalu cek, apakah ada design-refference. Jika ada pelajari penggunaan warna, asset, dan kebiasaan UI