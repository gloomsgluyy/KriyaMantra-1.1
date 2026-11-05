import { NextRequest, NextResponse } from "next/server";
import { UpdateScheduleInput } from "@/types/schedule";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdateScheduleInput = await request.json();

    return NextResponse.json({
      data: {
        id,
        scheduledAt: body.scheduledAt || new Date().toISOString(),
        caption: body.caption,
        status: body.status || "scheduled",
        updatedAt: new Date().toISOString(),
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
          message: "Gagal memperbarui jadwal.",
          requestId: `req-${Date.now()}`,
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({
    data: { id, success: true },
    meta: {
      requestId: `req-${Date.now()}`,
    },
  });
}

