# Kriyamantra — FE/BE Codebase Standard

**Versi:** 1.0
**Status:** Wajib untuk seluruh modul SRS

## 1. Stack yang Disepakati

| Layer | Standar |
|---|---|
| Language | TypeScript strict |
| Runtime | Node.js |
| Framework | Next.js `16.4.3`, App Router |
| UI | React `19.3.0`, custom components |
| Styling | Tailwind CSS `4`, `app/globals.css`, token-based CSS |
| Auth | Supabase Auth + `@supabase/ssr`, cookie session |
| Database | Supabase PostgreSQL + Drizzle ORM `0.45.4` |
| Migration | Drizzle Kit `0.31.11`, `drizzle/*.sql` |
| AI | Xkiro adapter di `lib/ai/xkiro` |
| Server state | `@tanstack/react-query`, satu QueryClient per browser |
| API | Next.js Route Handlers di `app/api/**/route.ts` |
| Validation | Validator domain terpusat di `lib/domain`; boundary validation wajib |
| HTTP | `lib/http.ts` / `lib/api-client.ts`; tidak boleh fetch contract tersebar |
| Alias | `@/*` |
| Quality gate | `npm run lint`, `npm run build`, test runnable untuk logic non-trivial |

## 2. Struktur Repository Target

```text
app/
  (public)/                 # landing, login, register
  (app)/                    # route protected
    page.tsx
    chat/page.tsx
    create/[id]/page.tsx
  api/[domain]/route.ts
  providers.tsx
components/
  ui/                       # primitive reusable
  [module]/                 # feature UI
hooks/
  use-[resource].ts         # TanStack Query hooks
lib/
  api-client.ts
  query-client.ts
  query-keys.ts
  auth/
  db/schema.ts
  domain/[module].ts        # schema + domain validation
  ai/xkiro/
  integrations/instagram/
  integrations/whatsapp/
types/
  api.ts
  [module].ts
drizzle/
docs/
  srs/
  EXECUTION_LOG.md
```

Aturan: `page.tsx` mengatur composition/layout; domain logic berada di `lib/`; query/mutation berada di hooks; komponen tidak mengakses DB atau secret.

## 3. Kontrak API Bersama

### Success

```ts
type ApiSuccess<T> = {
  data: T;
  meta?: { requestId: string; nextCursor?: string | null };
};
```

### Error

```ts
type ApiError = {
  error: {
    code: string;
    message: string;       // aman ditampilkan ke user
    fieldErrors?: Record<string, string[]>;
    requestId: string;
  };
};
```

HTTP minimum: `400 VALIDATION_ERROR`, `401 UNAUTHENTICATED`, `403 FORBIDDEN`, `404 NOT_FOUND`, `409 CONFLICT`, `413 PAYLOAD_TOO_LARGE`, `429 RATE_LIMITED`, `500 INTERNAL_ERROR`, `502 UPSTREAM_ERROR`.

BE tidak mengembalikan stack trace, SQL, API key, access token, atau prompt internal. FE menampilkan `message`, menyimpan `requestId` untuk support, dan tidak menebak bentuk response.

## 4. Auth, Tenant, dan Ownership

Setiap protected Route Handler wajib menjalankan urutan:

```text
get Supabase session → resolve user → resolve owned business → authorize role → validate input → execute scoped query → audit critical action
```

- `businessId` dari client hanya hint; BE wajib memverifikasi ownership.
- Query wajib memiliki scope `business_id = authorizedBusinessId`.
- CRAFTER hanya akses usaha sendiri; ADMIN hanya metadata operasional tanpa token mentah; DEMO_JUDGE hanya sandbox; ADVISOR P2 read-only.
- RLS Supabase adalah defense-in-depth, bukan pengganti authorization di Route Handler.

## 5. Naming dan Folder Convention

| Item | Convention | Contoh |
|---|---|---|
| Feature ID | `F-[MODULE]-NN` | `F-GEN-03` |
| FR heading | `FR-[MODULE]-NNN` + status | `FR-GEN-003: Generator Poster (Status: Pending)` |
| Acceptance | `AC-[MODULE]-NNN` | `AC-GEN-003` |
| Business rule | `BR-[MODULE]-NNN` | `BR-GEN-001` |
| Validation | `VR-[MODULE]-NNN` | `VR-GEN-001` |
| API ID | `API-[MODULE]-NNN` | `API-GEN-001` |
| DB table | snake_case plural | `content_generations` |
| TS type | PascalCase | `ContentGeneration` |
| hook | `use-[resource].ts` | `use-content-generations.ts` |
| query key | stable array | `['generations', businessId]` |

## 6. TanStack Query Standard

```ts
new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, gcTime: 300_000, retry: 1, refetchOnWindowFocus: false },
    mutations: { retry: 0 },
  },
});
```

- Query key wajib memuat tenant/resource ID; tidak boleh memuat token/secret.
- Mutation sukses meng-invalidate key paling sempit.
- Jangan optimistic-update operasi AI, publish, delete, atau approval tanpa rollback.
- Poll generation hanya saat `queued`/`processing`; interval 3 detik; stop saat terminal.
- List besar memakai cursor pagination `{ items, nextCursor }`.
- `staleTime` per domain mengikuti Tech Stack Query: profile 5m, products 60s, messages 0–10s, generations 10–30s.

## 7. FE Contract

Setiap screen wajib mendefinisikan:

1. route dan access guard;
2. loading/skeleton;
3. empty state;
4. error state + retry;
5. success state;
6. disabled state saat mutation;
7. mobile 360–414 px dan desktop 1280 px;
8. keyboard/focus/label/ARIA;
9. ID/EN copy key;
10. status tidak hanya memakai warna.

Form: controlled/uncontrolled bebas, tetapi payload final harus sesuai DTO. Error field ditampilkan dekat field; submit tidak boleh double-fire. Upload menampilkan ukuran, format, progress, cancel, dan retry.

## 8. BE Contract

Setiap endpoint wajib mendefinisikan:

- method, route, auth, role, ownership;
- request params/query/body;
- response DTO dan status code;
- validation limits;
- transaction/idempotency bila side effect;
- audit event bila aksi kritis;
- rate limit dan timeout;
- error mapping;
- pagination/filter/sort bila list.

AI: semua model dipanggil melalui `lib/ai/xkiro`; log `ai_runs` berisi komponen, model, token, latency, cost, status, error. Input impor adalah data, bukan instruksi. Prompt internal tidak dikirim ke client.

## 9. Database Standard

- UUID primary key; `created_at`, `updated_at` UTC pada entity mutable.
- Foreign key wajib; index pada seluruh FK dan pola `(business_id, created_at)`.
- Soft delete hanya bila diperlukan untuk audit; hak hapus tetap harus benar-benar menghapus data sesuai kebijakan.
- Harga, consent, approval, token, dan audit event tidak boleh hilang tanpa aturan eksplisit.
- Media hanya metadata di DB; object disimpan di storage dengan URL HTTPS dan signed URL bila privat.
- Migration reversible secara operasional, diberi nama jelas, dicatat di execution log.

## 10. Status Enum Utama

```text
Generation: queued | processing | ready | failed
Content: draft | approved | scheduled | published | failed
Consent: pending | granted | revoked
Source: draft | processing | imported | failed | deleted
Task: todo | in_progress | done | snoozed | skipped
Notification: unread | read | archived
```

## 11. Security Minimum

- Secret hanya environment variable; `.env.example` tanpa nilai rahasia.
- Instagram/WhatsApp token terenkripsi at rest; tidak pernah di UI/log/query cache.
- Rate limit auth, upload, chat, generation, revision, webhook.
- Validasi MIME, extension, ukuran, image dimensions, URL SSRF/robots bila scraping.
- Idempotency key untuk publish, webhook, dan job retry.
- Consent AI serta approval post dicatat dengan actor, timestamp, version, IP/device metadata sesuai minimisasi data.

## 12. Definition of Done Modul

- Semua FR memiliki status.
- FE dan BE contract terimplementasi atau gap ditandai.
- RLS/ownership/RBAC diuji.
- Loading, empty, error, offline, retry tersedia.
- Acceptance criteria lulus.
- `npm run lint` dan `npm run build` lulus.
- Logic non-trivial meninggalkan satu runnable check/test.
- `docs/EXECUTION_LOG.md` diperbarui.
