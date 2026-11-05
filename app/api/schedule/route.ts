import { NextRequest, NextResponse } from "next/server";
import { ScheduledPost, SchedulePostInput } from "@/types/schedule";

let scheduleStore: ScheduledPost[] = [
  {
    id: "post-1",
    businessId: "biz_sekar_jepun_01",
    generationId: "gen-sekar-jepun-01",
    productName: "Kain Tenun Endek Sekar Jepun Sutra Alam",
    title: "Opsi A: Warisan Sutra Suci Leluhur",
    format: "feed",
    imageUrl: "/assets/content/poster-1.webp",
    caption:
      "Menyulam doa dalam setiap helai benang sutra alam. Kain Tenun Endek Sekar Jepun ini ditenun perlahan menggunakan pewarna alami fermentasi daun tarum dan kulit manggis. Mewujudkan keharmonisan Tri Hita Karana dalam selembar wastra pusaka Bali.\n\n✨ 100% Sutra Alam & Pewarna Organik\n📍 Klungkung, Bali",
    hashtags: [
      "#TenunEndek",
      "#WastraBali",
      "#SutraAlam",
      "#PewarnaAlami",
      "#KriyaMantra",
      "#BaliDigiFest2026",
    ],
    scheduledAt: "2026-03-04T02:00:00Z", // 10:00 WITA
    status: "scheduled",
    createdAt: "2026-03-03T08:10:00Z",
    updatedAt: "2026-03-03T08:10:00Z",
  },
  {
    id: "post-2",
    businessId: "biz_sekar_jepun_01",
    generationId: "gen-sekar-jepun-01",
    productName: "Kain Songket Bali Benang Emas Klungkung",
    title: "Opsi B: Keanggunan Wastra Tropis",
    format: "story",
    imageUrl: "/assets/illustrations/poster-story.webp",
    caption:
      "Where Sacred Heritage Meets Sustainable Luxury. Each thread honors centuries-old Balinese tradition, hand-loomed with wild botanical dyes for collectors worldwide.",
    hashtags: [
      "#BalineseHeritage",
      "#SustainableFashion",
      "#ArtisanCraft",
      "#BaliLuxury",
    ],
    scheduledAt: "2026-03-05T10:00:00Z", // 18:00 WITA (Golden Hour)
    status: "scheduled",
    createdAt: "2026-03-03T08:12:00Z",
    updatedAt: "2026-03-03T08:12:00Z",
  },
  {
    id: "post-3",
    businessId: "biz_sekar_jepun_01",
    productName: "Syal Tenun Endek Katun Pewarna Daun Tarum",
    title: "Wastra Bali Harian Berkualitas",
    format: "feed",
    imageUrl: "/assets/content/poster-2.webp",
    caption:
      "Syal aksesoris leher katun tenun tangan dengan gradasi warna biru indigo alami dari fermentasi daun tarum lokal.",
    hashtags: ["#TenunBali", "#IndigoTarum", "#KriyaMantra"],
    scheduledAt: "2026-03-01T02:00:00Z",
    status: "published",
    publishedAt: "2026-03-01T02:01:00Z",
    instagramPostUrl: "https://instagram.com/p/mock_post_1",
    createdAt: "2026-02-28T09:00:00Z",
    updatedAt: "2026-03-01T02:01:00Z",
  },
];

export async function GET() {
  return NextResponse.json({
    data: scheduleStore,
    meta: {
      requestId: `req-${Date.now()}`,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: SchedulePostInput = await request.json();

    const newPost: ScheduledPost = {
      id: `post-${Date.now()}`,
      businessId: "biz_sekar_jepun_01",
      generationId: body.generationId,
      productName: body.productName,
      title: body.title,
      format: body.format,
      imageUrl: body.imageUrl,
      caption: body.caption,
      hashtags: body.hashtags,
      scheduledAt: body.scheduledAt,
      status: "scheduled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    scheduleStore.unshift(newPost);

    return NextResponse.json({
      data: newPost,
      meta: {
        requestId: `req-${Date.now()}`,
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "SERVER_ERROR",
          message: "Gagal menjadwalkan postingan.",
          requestId: `req-${Date.now()}`,
        },
      },
      { status: 500 }
    );
  }
}

