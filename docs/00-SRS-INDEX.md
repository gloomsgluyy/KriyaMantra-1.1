# Kriyamantra — Software Requirements Specification

**Sumber kebenaran:** `01_PRD.md`, `00_PROJECT_CONTEXT.md`, `TECH_STACK_AND_TANSTACK_QUERY.md`
**Template acuan:** `SRS_01_(CONTOH SRS1).md`, `SRS_02_(CONTOH SRS2).md`
**Versi:** 1.0
**Tanggal:** November 2026
**Implementation Status:** Specification baseline — seluruh feature berstatus `Pending` sampai audit codebase dan verifikasi end-to-end selesai.

## Cara Membaca

1. Baca `00-CODEBASE-STANDARD.md` sebelum mengerjakan modul.
2. Baca satu file modul sesuai tugas.
3. FE mengimplementasikan kontrak UI dan query/mutation.
4. BE mengimplementasikan kontrak endpoint, validasi, authorization, dan persistence.
5. FE/BE menyamakan `Feature ID`, `API ID`, response envelope, error code, dan status enum.
6. Update status FR serta `docs/EXECUTION_LOG.md` setelah verifikasi.

## Modul SRS

| No | Modul | File | Feature PRD |
|---:|---|---|---|
| 01 | Authentication | `01-auth.md` | F-AUTH-01—05 |
| 02 | Onboarding | `02-onboarding.md` | F-ONB-01—06 |
| 03 | Sumber Usaha | `03-business-sources.md` | F-SRC-01—11 |
| 04 | Profil, Brand Kit & Memori | `04-memory.md` | F-MEM-01—06 |
| 05 | Katalog Produk | `05-catalog.md` | F-CAT-01—03 |
| 06 | Chat Agent | `06-chat-agent.md` | F-CHAT-01—09 |
| 07 | Creative Engine | `07-creative-engine.md` | F-GEN-01—11 |
| 08 | Review & Persetujuan | `08-review.md` | F-REV-01—07 |
| 09 | Penjadwalan & Auto-post Instagram | `09-scheduling.md` | F-SCH-01—09 |
| 10 | Tugas Mingguan | `10-weekly-tasks.md` | F-TSK-01—05 |
| 11 | Dashboard | `11-dashboard.md` | F-DASH-01—05 |
| 12 | Galeri Konten | `12-gallery.md` | F-GAL-01—03 |
| 13 | Laporan & Rekomendasi | `13-reports.md` | F-RPT-01—05 |
| 14 | Kalender Momen Bali | `14-moments.md` | F-EVT-01—02 |
| 15 | Pengaturan & Privasi | `15-settings-privacy.md` | F-SET-01—04 |
| 16 | Sistem & Notifikasi | `16-system-notifications.md` | F-SYS-01—04 |
| 17 | Mode Juri/Demo | `17-demo-mode.md` | F-DEMO-01—03 |
| 18 | Kanal WhatsApp | `18-whatsapp.md` | F-WA-01—06 |
| 19 | Operasional & Monitoring | `19-ops.md` | F-OPS-01—04 |

## Prioritas Implementasi

1. Fondasi: AUTH, ONB, MEM, CAT, CHAT.
2. Alur demo utama: GEN, REV, SCH.
3. Retensi: TSK, DASH, GAL, SYS.
4. Peningkatan: SRC, SET, OPS.
5. P1: RPT, EVT, DEMO.
6. Opsional: WA.

## Status Rule

- `Pending`: belum diverifikasi ada dan berfungsi di codebase.
- `Partial`: sebagian berjalan; gap wajib ditulis di heading.
- `Done`: route, UI, API, authorization, persistence, error handling, dan acceptance test telah diverifikasi.
- Jangan mengklaim WhatsApp, auto-post, atau cek keunikan sebagai berfungsi sebelum status `Done`.
