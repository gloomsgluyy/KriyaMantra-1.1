/**
 * Modul SCH: Penjadwalan & Auto-post Instagram
 * Sesuai SRS_SCH_FE.md
 */

export type PostStatus = "scheduled" | "publishing" | "published" | "failed";

export type PostFormat = "feed" | "story";

export interface ScheduledPost {
  id: string;
  businessId: string;
  generationId?: string;
  productName: string;
  title: string;
  format: PostFormat;
  imageUrl: string;
  caption: string;
  hashtags: string[];
  scheduledAt: string; // ISO 8601 UTC
  status: PostStatus;
  publishedAt?: string;
  failedReason?: string;
  instagramPostUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BestTimeSlot {
  dayName: string;
  timeWita: string;
  reason: string;
  touristActiveScore: number; // 0 - 100
}

export interface PostPackage {
  id: string;
  postId: string;
  imageDownloadUrl: string;
  captionText: string;
  hashtagsText: string;
  suggestedTime: string;
  instructions: string;
}

export interface SchedulePostInput {
  generationId?: string;
  productName: string;
  title: string;
  format: PostFormat;
  imageUrl: string;
  caption: string;
  hashtags: string[];
  scheduledAt: string;
}

export interface UpdateScheduleInput {
  scheduledAt?: string;
  caption?: string;
  status?: PostStatus;
}

