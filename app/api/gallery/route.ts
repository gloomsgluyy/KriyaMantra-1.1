import { NextRequest, NextResponse } from "next/server";
import { GalleryPoster } from "@/types/gallery";

let galleryStore: GalleryPoster[] = [
  {
    id: "gal-1",
    generationId: "gen-sekar-jepun-01",
    title: "Warisan Leluhur Daun Tarum",
    aspectRatio: "4:5",
    thumbnailUrl: "/assets/content/poster-1.webp",
    fullImageUrl: "/assets/content/poster-1.webp",
    productName: "Kain Tenun Endek Sekar Jepun Sutra Alam",
    captionId: "Menyulam doa dalam setiap helai benang sutra alam berpewarna daun tarum...",
    captionEn: "Weaving prayers into pure natural silk infused with indigo tarum leaves...",
    hashtags: ["#TenunEndek", "#BaliDigiFest2026", "#WastraBali", "#PewarnaAlami"],
    createdAt: "2026-03-03T08:30:00Z",
    downloadsCount: 14,
    isPublished: true,
    engagementEst: "Est. 1.2k Reach",
  },
  {
    id: "gal-2",
    generationId: "gen-sekar-jepun-01",
    title: "Sentuhan Elegan Wisatawan Modern",
    aspectRatio: "4:5",
    thumbnailUrl: "/assets/content/poster-2.webp",
    fullImageUrl: "/assets/content/poster-2.webp",
    productName: "Kain Tenun Endek Sekar Jepun Sutra Alam",
    captionId: "Keindahan wastra autentik Klungkung yang berpadu dengan gaya hidup elegan nan berkelanjutan.",
    captionEn: "Authentic Klungkung craftsmanship blending timeless heritage with sustainable modern luxury.",
    hashtags: ["#SustainableLuxury", "#BaliHandmade", "#EndekBali", "#ArtisanCraft"],
    createdAt: "2026-03-02T14:15:00Z",
    downloadsCount: 9,
    isPublished: true,
    engagementEst: "Est. 850 Reach",
  },
  {
    id: "gal-3",
    generationId: "gen-songket-02",
    title: "Kemilau Songket Klungkung (Story)",
    aspectRatio: "9:16",
    thumbnailUrl: "/assets/content/poster-story-1.webp",
    fullImageUrl: "/assets/content/poster-story-1.webp",
    productName: "Selendang Songket Sutra Benang Emas",
    captionId: "Kemegahan ragam hias khas Klungkung yang ditenun dengan presisi dan dedikasi seumur hidup.",
    captionEn: "The majesty of Klungkung motifs handwoven with life-long precision and gold threads.",
    hashtags: ["#SongketBali", "#StoryInstagram", "#WastraNusantara"],
    createdAt: "2026-03-01T10:00:00Z",
    downloadsCount: 21,
    isPublished: false,
    engagementEst: "Est. 2.1k Story Views",
  },
  {
    id: "gal-4",
    generationId: "gen-tarum-03",
    title: "Filosofi Indigo Biru Laut Kusamba",
    aspectRatio: "4:5",
    thumbnailUrl: "/assets/content/raw-fabric.jpg",
    fullImageUrl: "/assets/content/raw-fabric.jpg",
    productName: "Kain Tenun Sutra Alam Indigo",
    captionId: "Dari pucuk daun tarum menjadi samudera warna biru sakral di atas bentangan benang sutra.",
    captionEn: "From indigo leaves harvested at dawn to the sacred azure ocean on handwoven silk.",
    hashtags: ["#IndigoDye", "#BaliTextiles", "#EcoFashion"],
    createdAt: "2026-02-28T09:30:00Z",
    downloadsCount: 6,
    isPublished: true,
    engagementEst: "Est. 620 Reach",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") || "all";

  let filtered = [...galleryStore];
  if (filter === "4:5") {
    filtered = filtered.filter((p) => p.aspectRatio === "4:5");
  } else if (filter === "9:16") {
    filtered = filtered.filter((p) => p.aspectRatio === "9:16");
  } else if (filter === "published") {
    filtered = filtered.filter((p) => p.isPublished);
  }

  return NextResponse.json({
    posters: filtered,
    totalCount: galleryStore.length,
    publishedCount: galleryStore.filter((p) => p.isPublished).length,
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID poster diperlukan" }, { status: 400 });
  }

  galleryStore = galleryStore.filter((p) => p.id !== id);
  return NextResponse.json({ success: true, message: "Poster berhasil dihapus" });
}

