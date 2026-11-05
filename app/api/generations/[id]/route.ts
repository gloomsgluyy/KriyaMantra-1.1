import { NextRequest, NextResponse } from "next/server";
import { mockGenerationsStore } from "@/lib/mock-generations";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const gen = mockGenerationsStore[id] || mockGenerationsStore["gen-sekar-jepun-01"];

  if (!gen) {
    return NextResponse.json(
      {
        error: {
          code: "NOT_FOUND",
          message: "Data generasi poster tidak ditemukan.",
          requestId: `req-${Date.now()}`,
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: gen,
    meta: {
      requestId: `req-${Date.now()}`,
    },
  });
}

