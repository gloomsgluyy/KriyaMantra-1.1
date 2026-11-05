import { NextRequest, NextResponse } from "next/server";
import { VerifiedFact } from "@/types/memory";

let memoryStore: VerifiedFact[] = [
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
];

export async function GET() {
  return NextResponse.json({
    data: memoryStore,
    meta: { total: memoryStore.length },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.fact || typeof body.fact !== "string" || !body.fact.trim()) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Fakta memori wajib diisi" } },
        { status: 422 }
      );
    }

    const newFact: VerifiedFact = {
      id: `fact-${Date.now()}`,
      fact: body.fact.trim(),
      source: body.source ?? "USER_INPUT",
      createdAt: new Date().toISOString(),
    };

    memoryStore = [newFact, ...memoryStore];

    return NextResponse.json({
      data: newFact,
      meta: { message: "Fakta memori baru berhasil ditambahkan" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Gagal menambahkan memori" } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: { code: "MISSING_ID", message: "ID fakta memori wajib disertakan" } },
        { status: 400 }
      );
    }

    memoryStore = memoryStore.filter((item) => item.id !== id);

    return NextResponse.json({
      data: { id, deleted: true },
      meta: { message: "Fakta memori berhasil dihapus" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Gagal menghapus memori" } },
      { status: 500 }
    );
  }
}

