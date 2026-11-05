import { NextRequest, NextResponse } from "next/server";
import { Product, ProductUpdateInput } from "@/types/product";

// Sesuai SRS_CAT_FE.md
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Mengambil daftar via GET /api/products internal logic
  return NextResponse.json({
    data: {
      id,
      businessId: "biz_sekar_jepun_01",
      name: "Kain Tenun Endek Sekar Jepun Sutra Alam",
      category: "tenun_endek",
      price: 850000,
      currency: "IDR",
      images: ["/assets/poster-1.webp", "/assets/raw-fabric.jpg"],
      description: "Wastra tenun ikat sutra alam pewarna nabati.",
      materialPhilosophy: "Motif Sekar Jepun menyimbolkan ketulusan hati dan kesucian doa.",
      promotionStatus: "published",
      lastPromotedAt: "2026-03-01T14:30:00Z",
      createdAt: "2026-02-20T08:00:00Z",
      updatedAt: "2026-03-01T14:30:00Z",
    },
    meta: { requestId: `req_${Date.now()}` },
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: ProductUpdateInput = await request.json();

    return NextResponse.json({
      data: {
        id,
        ...body,
        updatedAt: new Date().toISOString(),
      },
      meta: { message: "Data karya berhasil diperbarui" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Gagal memperbarui produk" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({
    data: { id, deleted: true },
    meta: { message: "Karya berhasil dihapus dari katalog" },
  });
}

