import { NextResponse } from "next/server";
import { DashboardSummary, DashboardActivityItem } from "@/types/dashboard";

const mockSummary: DashboardSummary = {
  businessId: "biz_sekar_jepun_01",
  businessName: "Tenun Sekar Jepun",
  totalPostsPublished: 4,
  totalPostsScheduled: 2,
  totalProductsCataloged: 3,
  quotaRemaining: 8,
  quotaTotal: 10,
  instagramConnected: true,
  instagramHandle: "@sekarjepun_endek",
  upcomingPost: {
    id: "post-1",
    businessId: "biz_sekar_jepun_01",
    productName: "Kain Tenun Endek Sekar Jepun Sutra Alam",
    title: "Opsi A: Warisan Sutra Suci Leluhur",
    format: "feed",
    imageUrl: "/assets/content/poster-1.webp",
    caption:
      "Menyulam doa dalam setiap helai benang sutra alam. Kain Tenun Endek Sekar Jepun ini ditenun perlahan menggunakan pewarna alami fermentasi daun tarum dan kulit manggis.",
    hashtags: ["#TenunEndek", "#WastraBali", "#BaliDigiFest2026"],
    scheduledAt: "2026-03-04T02:00:00Z", // 10:00 WITA
    status: "scheduled",
    createdAt: "2026-03-03T08:10:00Z",
    updatedAt: "2026-03-03T08:10:00Z",
  },
};

const mockActivities: DashboardActivityItem[] = [
  {
    id: "act-1",
    title: "Poster Disetujui & Masuk Jadwal",
    description: "Kain Tenun Endek Sekar Jepun dijadwalkan tayang Rabu, 10:00 WITA",
    duration: "1.2s",
    timeAgo: "10 menit lalu",
    type: "approval",
  },
  {
    id: "act-2",
    title: "Generasi Poster AI Selesai",
    description: "2 opsi visual rancangan lolos uji keunikan 98% dan lolos guardrail etika",
    duration: "4.5s",
    timeAgo: "1 jam lalu",
    type: "generation",
  },
  {
    id: "act-3",
    title: "Postingan Instagram Berhasil Terbit",
    description: "Syal Tenun Endek Katun Pewarna Daun Tarum telah live di @sekarjepun_endek",
    timeAgo: "Kemarin",
    type: "publish",
  },
  {
    id: "act-4",
    title: "Karya Baru Ditambahkan ke Katalog",
    description: "Kain Songket Bali Benang Emas Klungkung tersimpan di katalog produk",
    timeAgo: "2 hari lalu",
    type: "catalog",
  },
  {
    id: "act-5",
    title: "Memori Brand Diselaraskan",
    description: "Palet Kuning Kunyit & Hitam Arang disetel sebagai identitas visual utama",
    timeAgo: "3 hari lalu",
    type: "memory",
  },
];

export async function GET() {
  return NextResponse.json({
    data: {
      summary: mockSummary,
      activities: mockActivities,
    },
    meta: {
      requestId: `req-${Date.now()}`,
    },
  });
}

