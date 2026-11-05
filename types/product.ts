/**
 * Modul CAT: Katalog Produk
 * Sesuai SRS_CAT_FE.md
 */

export type PromotionStatus = "never_promoted" | "scheduled" | "published";

export interface Product {
  id: string;
  businessId: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  images: string[];
  description: string;
  materialPhilosophy: string;
  promotionStatus: PromotionStatus;
  lastPromotedAt?: string;
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  materialPhilosophy: string;
}

export interface ProductUpdateInput {
  name?: string;
  category?: string;
  price?: number;
  images?: string[];
  description?: string;
  materialPhilosophy?: string;
  promotionStatus?: PromotionStatus;
}

