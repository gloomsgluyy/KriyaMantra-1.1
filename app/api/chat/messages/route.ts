import { NextRequest, NextResponse } from "next/server";
import { ChatMessage, SendMessageInput } from "@/types/chat";

let messagesStore: ChatMessage[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    role: "assistant",
    content:
      "Om Swastyastu Ibu Ketut! Selamat datang di Kriya Mantra. Ada karya wastra tenun baru yang ingin kita buatkan materi promosinya hari ini? Anda bisa langsung melampirkan foto karya atau memilih dari katalog.",
    createdAt: "2026-03-03T08:00:00Z",
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    role: "user",
    content:
      "Tolong buatkan poster Instagram untuk Kain Tenun Endek Sekar Jepun Sutra Alam ini. Tekankan nilai pewarna alami daun tarum dan targetkan wisatawan internasional yang menghargai keberlanjutan.",
    attachment: {
      id: "att-1",
      type: "image",
      url: "/assets/content/raw-fabric.jpg",
      name: "foto-kain-sekar-jepun.jpg",
      productId: "prod-1",
    },
    createdAt: "2026-03-03T08:02:00Z",
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    role: "assistant",
    content:
      "Baik, saya telah membaca memori brand Tenun Sekar Jepun: pewarna biru fermentasi daun tarum 14 hari, sutra alam lembut, dan filosofi kesucian bunga kamboja. Tiga rancangan visual poster telah selesai disiapkan dengan rasio Feed 4:5 dan Story 9:16:",
    posterOptions: [
      {
        id: "opt-1",
        generationId: "gen-sekar-jepun-01",
        title: "Opsi A: Warisan Leluhur & Alam",
        thumbnailUrl: "/assets/content/poster-1.webp",
        aspectRatio: "4:5",
        captionPreview:
          "Menyulam doa dalam setiap helai benang sutra alam berpewarna daun tarum...",
        uniquenessScore: 98,
      },
      {
        id: "opt-2",
        generationId: "gen-sekar-jepun-01",
        title: "Opsi B: Elegan Wisata Modern",
        thumbnailUrl: "/assets/content/poster-2.webp",
        aspectRatio: "4:5",
        captionPreview:
          "Where Sacred Heritage Meets Sustainable Luxury in Bali's Artisan Heart...",
        uniquenessScore: 95,
      },
    ],
    createdAt: "2026-03-03T08:04:00Z",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId") || "conv-1";

  const messages = messagesStore.filter(
    (m) => m.conversationId === conversationId
  );

  return NextResponse.json({
    data: messages,
    meta: {
      requestId: `req-${Date.now()}`,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: SendMessageInput = await request.json();

    if (!body.content && !body.attachment) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Pesan atau lampiran tidak boleh kosong.",
            requestId: `req-${Date.now()}`,
          },
        },
        { status: 422 }
      );
    }

    const conversationId = body.conversationId || "conv-1";

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      role: "user",
      content: body.content,
      attachment: body.attachment
        ? {
            id: `att-${Date.now()}`,
            type: body.attachment.type,
            url: body.attachment.url,
            name: body.attachment.name,
            productId: body.attachment.productId,
          }
        : undefined,
      createdAt: new Date().toISOString(),
    };

    messagesStore.push(userMsg);

    // Otomatis respon asisten AI
    const isAskingPoster =
      body.content.toLowerCase().includes("poster") ||
      body.content.toLowerCase().includes("buat") ||
      body.content.toLowerCase().includes("generate") ||
      !!body.attachment;

    let assistantMsg: ChatMessage;

    if (isAskingPoster) {
      assistantMsg = {
        id: `msg-${Date.now() + 1}`,
        conversationId,
        role: "assistant",
        content:
          "Saya telah memproses permintaan Anda berdasarkan profil dan memori brand Tenun Sekar Jepun. Dua rancangan poster telah dibuat siap untuk Anda review di Studio:",
        posterOptions: [
          {
            id: `opt-${Date.now()}-1`,
            generationId: "gen-sekar-jepun-01",
            title: "Opsi A: Warisan Sutra Suci",
            thumbnailUrl: "/assets/content/poster-1.webp",
            aspectRatio: "4:5",
            captionPreview:
              "Menyulam keharmonisan Tri Hita Karana dalam tenun ikat Bali...",
            uniquenessScore: 97,
          },
          {
            id: `opt-${Date.now()}-2`,
            generationId: "gen-sekar-jepun-01",
            title: "Opsi B: Keanggunan Wastra Tropis",
            thumbnailUrl: "/assets/content/poster-2.webp",
            aspectRatio: "4:5",
            captionPreview:
              "Handcrafted elegance born from natural indigo and pure Balinese devotion...",
            uniquenessScore: 94,
          },
        ],
        createdAt: new Date(Date.now() + 1000).toISOString(),
      };
    } else {
      assistantMsg = {
        id: `msg-${Date.now() + 1}`,
        conversationId,
        role: "assistant",
        content:
          "Baik Ibu Ketut. Saya selalu siap membantu merumuskan cerita wastra tenun Anda menjadi konten promosi berdaya pikat tinggi. Silakan pilih karya dari katalog atau ketik 'Buatkan poster' kapan saja.",
        createdAt: new Date(Date.now() + 1000).toISOString(),
      };
    }

    messagesStore.push(assistantMsg);

    return NextResponse.json({
      data: assistantMsg,
      meta: {
        requestId: `req-${Date.now()}`,
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "SERVER_ERROR",
          message: "Gagal memproses pesan.",
          requestId: `req-${Date.now()}`,
        },
      },
      { status: 500 }
    );
  }
}

