import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    data: {
      success: true,
      message:
        "Data simulasi penjurian berhasil di-reset ke kondisi awal bersih (clean-start). Seluruh riwayat obrolan, draft poster, dan katalog telah diselaraskan dengan data binaan Tenun Sekar Jepun.",
      resetAt: new Date().toISOString(),
    },
    meta: {
      requestId: `req-${Date.now()}`,
    },
  });
}

