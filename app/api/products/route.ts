import { NextRequest, NextResponse } from "next/server";
import { Product, ProductCreateInput } from "@/types/product";

let productsStore: Product[] = [
  {
    id: "prod-1",
    businessId: "biz_sekar_jepun_01",
    name: "Kain Tenun Endek Sekar Jepun Sutra Alam",
    category: "tenun_endek",
    price: 850000,
    currency: "IDR",
    images: ["/assets/content/poster-1.webp", "/assets/content/raw-fabric.jpg"],
    description:
      "Wastra tenun ikat sutra alam motif Sekar Jepun dengan pewarna alami daun tarum dan kulit manggis. Tekstur jatuh lembut dan adem untuk busana adat maupun formal.",
    materialPhilosophy:
      "Motif Sekar Jepun (bunga kamboja) menyimbolkan ketulusan hati, kesucian doa, dan keabadian tradisi leluhur Bali.",
    promotionStatus: "published",
    lastPromotedAt: "2026-03-01T14:30:00Z",
    createdAt: "2026-02-20T08:00:00Z",
    updatedAt: "2026-03-01T14:30:00Z",
  },
  {
    id: "prod-2",
    businessId: "biz_sekar_jepun_01",
    name: "Kain Songket Bali Benang Emas Klungkung",
    category: "tenun_endek",
    price: 2400000,
    currency: "IDR",
    images: ["/assets/content/raw-fabric.jpg"],
    description:
      "Kain songket mewah dengan sulaman benang emas murni motif pepatran khas istana Semarapura Klungkung.",
    materialPhilosophy:
      "Ragam hias pepatran flora melambangkan kemakmuran dan keselarasan manusia dengan alam semesta (Tri Hita Karana).",
    promotionStatus: "scheduled",
    scheduledFor: "2026-03-04T10:00:00Z",
    createdAt: "2026-02-22T09:00:00Z",
    updatedAt: "2026-03-02T11:00:00Z",
  },
  {
    id: "prod-3",
    businessId: "biz_sekar_jepun_01",
    name: "Syal Tenun Endek Katun Pewarna Daun Tarum",
    category: "tenun_endek",
    price: 350000,
    currency: "IDR",
    images: ["/assets/content/poster-2.webp"],
    description:
      "Syal aksesoris leher katun tenun tangan dengan gradasi warna biru indigo alami dari fermentasi daun tarum lokal.",
    materialPhilosophy:
      "Warna biru indigo alami membutuhkan 14 hari proses rendaman tradisional tanpa bahan kimia sintetik.",
    promotionStatus: "never_promoted",
    createdAt: "2026-02-25T11:00:00Z",
    updatedAt: "2026-02-25T11:00:00Z",
  },
  {
    id: "prod-4",
    businessId: "biz_sekar_jepun_01",
    name: "Kain Endek Motif Geometris Rangrang Gelgel",
    category: "tenun_endek",
    price: 650000,
    currency: "IDR",
    images: ["/assets/raw-fabric.jpg"],
    description:
      "Tenun endek motif segitiga rangrang geometris yang dinamis dengan kombinasi warna tanah dan amber.",
    materialPhilosophy:
      "Motif rangrang melambangkan perisai penolak bala dan kekuatan spiritual pelindung keluarga.",
    promotionStatus: "never_promoted",
    createdAt: "2026-02-28T13:00:00Z",
    updatedAt: "2026-02-28T13:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.toLowerCase();

  let filtered = [...productsStore];

  if (status && status !== "all") {
    filtered = filtered.filter((p) => p.promotionStatus === status);
  }

  if (q) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materialPhilosophy.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    data: filtered,
    meta: {
      total: filtered.length,
      counts: {
        all: productsStore.length,
        never_promoted: productsStore.filter((p) => p.promotionStatus === "never_promoted").length,
        scheduled: productsStore.filter((p) => p.promotionStatus === "scheduled").length,
        published: productsStore.filter((p) => p.promotionStatus === "published").length,
      },
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: ProductCreateInput = await request.json();

    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Nama dan harga produk wajib diisi" } },
        { status: 422 }
      );
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      businessId: "biz_sekar_jepun_01",
      name: body.name.trim(),
      category: body.category || "tenun_endek",
      price: Number(body.price),
      currency: "IDR",
      images: body.images && body.images.length > 0 ? body.images : ["/assets/poster-1.webp"],
      description: body.description || "",
      materialPhilosophy: body.materialPhilosophy || "",
      promotionStatus: "never_promoted",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    productsStore = [newProduct, ...productsStore];

    return NextResponse.json({
      data: newProduct,
      meta: { message: "Karya baru berhasil ditambahkan ke katalog" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Gagal menambahkan produk" } },
      { status: 500 }
    );
  }
}

