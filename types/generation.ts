/**
 * Modul GEN & REV: Creative Engine & Review Workbench
 * Sesuai SRS_GEN_FE.md dan SRS_REV_FE.md
 */

export type GenerationStatus = "queued" | "processing" | "completed" | "failed";

export interface BilingualCaption {
  id: string; // Teks caption Bahasa Indonesia
  en: string; // Teks caption English for Tourists
  hashtags: string[];
}

export interface QualityScore {
  visualQuality: number; // Skala 0 - 100
  uniquenessScore: number; // Skala 0 - 100
  culturalAuthenticity: number; // Skala 0 - 100
  wcagContrastPass: boolean;
  ethicalAiPass: boolean; // 100% fakta terverifikasi tanpa klaim palsu
}

export interface PosterOption {
  id: string;
  generationId: string;
  title: string;
  theme: string;
  feedImageUrl: string; // Rasio 4:5
  storyImageUrl: string; // Rasio 9:16
  caption: BilingualCaption;
  quality: QualityScore;
  aiMarkerText: string; // F-REV-07: Penanda karya dibuat bersama Kriya Mantra
  createdAt: string;
}

export interface GenerationVersion {
  id: string;
  versionNumber: number;
  feedback: string;
  optionId: string;
  captionId: string;
  captionEn: string;
  feedImageUrl: string;
  createdAt: string;
}

export interface GenerationDetail {
  id: string;
  businessId: string;
  productId?: string;
  productName?: string;
  status: GenerationStatus;
  progressPercent: number;
  statusMessage: string;
  options: PosterOption[];
  selectedOptionId?: string;
  revisionsLeft: number; // Maksimum 3 (F-REV-06)
  maxRevisions: number;
  versions: GenerationVersion[];
  approvedAt?: string;
  approvalStatus?: "pending" | "approved";
  createdAt: string;
  updatedAt: string;
}

export interface CreateGenerationInput {
  productId?: string;
  imageUrl?: string;
  promptBrief?: string;
  targetAudience?: string;
}

export interface RevisionInput {
  generationId: string;
  optionId: string;
  feedback: string;
}

export interface ApproveGenerationInput {
  generationId: string;
  optionId: string;
  captionLanguage: "id" | "en";
  editedCaption?: string;
  scheduledDate?: string;
}

