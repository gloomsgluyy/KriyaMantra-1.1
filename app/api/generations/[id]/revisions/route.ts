import { NextRequest, NextResponse } from "next/server";
import { RevisionInput } from "@/types/generation";
import { mockGenerationsStore } from "@/lib/mock-generations";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: RevisionInput = await request.json();

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

    if (gen.revisionsLeft <= 0) {
      return NextResponse.json(
        {
          error: {
            code: "REVISION_LIMIT_EXCEEDED",
            message: "Batas maksimal revisi (3 kali) telah tercapai.",
            requestId: `req-${Date.now()}`,
          },
        },
        { status: 422 }
      );
    }

    gen.revisionsLeft -= 1;
    const versionNumber = gen.versions.length + 1;
    const currentOpt = gen.options.find((o) => o.id === body.optionId) || gen.options[0];

    // Simulasikan penyesuaian visual / caption berdasarkan input bahasa natural
    currentOpt.caption.id = `${currentOpt.caption.id}\n\n[Revisi v${versionNumber}: ${body.feedback}]`;
    currentOpt.caption.en = `${currentOpt.caption.en}\n\n[Revision v${versionNumber}: Adjusted based on artisan note: ${body.feedback}]`;

    gen.versions.unshift({
      id: `v-${Date.now()}`,
      versionNumber,
      feedback: body.feedback,
      optionId: body.optionId,
      captionId: currentOpt.caption.id,
      captionEn: currentOpt.caption.en,
      feedImageUrl: currentOpt.feedImageUrl,
      createdAt: new Date().toISOString(),
    });

    gen.updatedAt = new Date().toISOString();

    return NextResponse.json({
      data: gen,
      meta: {
        requestId: `req-${Date.now()}`,
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "SERVER_ERROR",
          message: "Gagal memproses revisi.",
          requestId: `req-${Date.now()}`,
        },
      },
      { status: 500 }
    );
  }
}

