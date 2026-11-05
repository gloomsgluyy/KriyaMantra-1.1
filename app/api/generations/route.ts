import { NextRequest, NextResponse } from "next/server";
import { CreateGenerationInput, GenerationDetail } from "@/types/generation";
import { mockGenerationsStore } from "@/lib/mock-generations";

export async function POST(request: NextRequest) {
  try {
    const body: CreateGenerationInput = await request.json();
    const newId = `gen-${Date.now()}`;

    const newGen: GenerationDetail = {
      id: newId,
      businessId: "biz_sekar_jepun_01",
      productId: body.productId || "prod-1",
      productName: body.promptBrief || "Karya Tenun Anyar Bali",
      status: "completed",
      progressPercent: 100,
      statusMessage: "Rancangan visual selesai dan lolos uji keunikan 97%",
      selectedOptionId: "opt-1",
      revisionsLeft: 3,
      maxRevisions: 3,
      versions: [],
      options: [
        {
          id: `opt-${newId}-1`,
          generationId: newId,
          title: "Opsi A: Pesona Wastra Alam",
          theme: "Keaslian Tradisi Bali",
          feedImageUrl: body.imageUrl || "/assets/content/poster-1.webp",
          storyImageUrl: "/assets/illustrations/poster-story.webp",
          caption: {
            id: "Karya seni wastra tenun tangan berjiwa luhur khas Bali. Dibuat dengan benang sutra bermutu tinggi dan pewarna botani ramah lingkungan.",
            en: "An authentic masterwork of Balinese handloom artistry. Created with natural fibers and botanical dyes for thoughtful connoisseurs worldwide.",
            hashtags: ["#TenunBali", "#KriyaMantra", "#ArtisanCraft"],
          },
          quality: {
            visualQuality: 95,
            uniquenessScore: 97,
            culturalAuthenticity: 100,
            wcagContrastPass: true,
            ethicalAiPass: true,
          },
          aiMarkerText: "Dibuat bersama Kriya Mantra AI • Fakta Terverifikasi",
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockGenerationsStore[newId] = newGen;

    return NextResponse.json({
      data: newGen,
      meta: {
        requestId: `req-${Date.now()}`,
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "SERVER_ERROR",
          message: "Gagal membuat generasi poster.",
          requestId: `req-${Date.now()}`,
        },
      },
      { status: 500 }
    );
  }
}

