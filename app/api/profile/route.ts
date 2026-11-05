import { NextRequest, NextResponse } from "next/server";
import { BusinessProfile } from "@/types/memory";

// In-memory mock store scoped per session
let profileStore: BusinessProfile = {
  id: "biz_sekar_jepun_01",
  businessName: "Sanggar Tenun Ikat Sekar Jepun",
  ownerName: "Ni Ketut Suartini",
  category: "tenun_endek",
  location: "Desa Gelgel, Klungkung, Bali",
  phoneWhatsapp: "+6281234567890",
  storyPhilosophy:
    "Meneruskan warisan leluhur tiga generasi dalam menenun kain tenun endek tradisional Bali dengan pewarna alami tanaman lokal seperti daun tarum dan kulit akar mengkudu.",
  instagramHandle: "@sekarjepun_endek",
  instagramConnected: true,
  brandKit: {
    palette: {
      primary: "#F59E0B",   // Warm Amber / Kuning Kunyit
      secondary: "#292524", // Hitam Arang Pejaten
      accent: "#831843",    // Merah Marun Mengkudu
    },
    brandVoice: "Hangat, menghormati tradisi leluhur, autentik, dan ramah wisatawan",
    targetAudience: "Pencinta wastra nusantara, kolektor seni, dan wisatawan mancanegara",
    moodDescription: "Artisanal, spiritual, tenang, dan kaya warisan budaya",
    typographyDescription: "Host Grotesk — proporsi geometris modern berjiwa humanis",
  },
  verifiedFacts: [
    {
      id: "fact-1",
      fact: "Didirikan turun-temurun sejak generasi ketiga perajin tenun Klungkung",
      source: "USER_INPUT",
      createdAt: "2026-03-01T08:00:00Z",
    },
    {
      id: "fact-2",
      fact: "Sentra sanggar berlokasi di Desa Gelgel, Klungkung, Bali",
      source: "USER_INPUT",
      createdAt: "2026-03-01T08:05:00Z",
    },
    {
      id: "fact-3",
      fact: "Menggunakan 100% serat benang sutra alam dan pewarna nabati lokal ramah lingkungan",
      source: "USER_INPUT",
      createdAt: "2026-03-02T10:15:00Z",
    },
    {
      id: "fact-4",
      fact: "Spesialis motif Sekar Jepun klasik yang melambangkan kemurnian dan keabadian",
      source: "AI_INFERENCE",
      createdAt: "2026-03-02T10:20:00Z",
    },
    {
      id: "fact-5",
      fact: "Akun Instagram aktif sejak 2021 dengan 4.800 pengikut pencinta wastra Nusantara",
      source: "IG_SYNC",
      createdAt: "2026-03-02T12:00:00Z",
    },
  ],
  boundedAiContext:
    "Sanggar Tenun Ikat Sekar Jepun (Klungkung, Bali). Kategori: Tenun Endek Sutra Alam pewarna nabati. Nilai: Warisan leluhur generasi ke-3, ramah lingkungan, motif klasik Sekar Jepun. Nada: Hangat, berwibawa, apresiatif terhadap seni tradisi. DILARANG membuat klaim diskon agresif atau klaim medis yang tidak terverifikasi.",
  updatedAt: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json({
    data: profileStore,
    meta: { requestId: `req_${Date.now()}` },
  });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    profileStore = {
      ...profileStore,
      businessName: body.businessName ?? profileStore.businessName,
      ownerName: body.ownerName ?? profileStore.ownerName,
      category: body.category ?? profileStore.category,
      location: body.location ?? profileStore.location,
      phoneWhatsapp: body.phoneWhatsapp ?? profileStore.phoneWhatsapp,
      storyPhilosophy: body.storyPhilosophy ?? profileStore.storyPhilosophy,
      brandKit: {
        ...profileStore.brandKit,
        ...(body.brandKit ?? {}),
      },
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      data: profileStore,
      meta: { message: "Profil dan Brand Kit berhasil diperbarui" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: { code: "INVALID_PAYLOAD", message: "Gagal memperbarui profil" } },
      { status: 400 }
    );
  }
}

