import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({
    data: {
      id,
      status: "scheduled",
      message: "Postingan berhasil dimasukkan kembali ke antrean publishing.",
      retriedAt: new Date().toISOString(),
    },
    meta: {
      requestId: `req-${Date.now()}`,
    },
  });
}

