import { NextRequest, NextResponse } from "next/server";
import { ApproveGenerationInput } from "@/types/generation";
import { mockGenerationsStore } from "@/lib/mock-generations";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: ApproveGenerationInput = await request.json();

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

    gen.selectedOptionId = body.optionId;
    gen.approvalStatus = "approved";
    gen.approvedAt = new Date().toISOString();
    gen.updatedAt = new Date().toISOString();

    return NextResponse.json({
      data: {
        generation: gen,
        scheduledDate: body.scheduledDate || new Date(Date.now() + 86400000).toISOString(),
        message: "Poster berhasil disetujui dan siap dijadwalkan ke Instagram.",
      },
      meta: {
        requestId: `req-${Date.now()}`,
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "SERVER_ERROR",
          message: "Gagal menyetujui poster.",
          requestId: `req-${Date.now()}`,
        },
      },
      { status: 500 }
    );
  }
}

