export interface GalleryPoster {
  id: string;
  generationId: string;
  title: string;
  aspectRatio: "4:5" | "9:16";
  thumbnailUrl: string;
  fullImageUrl: string;
  captionId: string;
  captionEn: string;
  hashtags: string[];
  productName: string;
  createdAt: string;
  downloadsCount: number;
  isPublished: boolean;
  engagementEst?: string;
}

export type GalleryFilter = "all" | "4:5" | "9:16" | "published";

