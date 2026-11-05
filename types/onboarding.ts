/**
 * Type definitions for Onboarding Wizard (SRS_ONB_FE & 01_PRD.md)
 */

export type CraftCategory =
  | "tenun_endek"
  | "ukiran_kayu"
  | "kerajinan_perak"
  | "anyaman_bambu"
  | "lukisan_kamasan"
  | "jamu_herbal"
  | "kuliner_bali"
  | "lainnya";

export type BusinessSourceType =
  | "instagram"
  | "website"
  | "catalog_upload"
  | "chat_interview"
  | "skip";

export interface OnboardingState {
  currentStep: number; // 1 to 5
  businessInfo: {
    businessName: string;
    category: CraftCategory | "";
    location: string;
    description: string;
  };
  aiConsent: {
    accepted: boolean;
    acceptedAt?: string;
    ipAddress?: string;
  };
  sourceSelection: {
    selectedSource: BusinessSourceType;
    sourceDetails?: string;
  };
  profileDraft: {
    brandVoice: string;
    targetAudience: string;
    speciality: string;
    verifiedFacts: Array<{
      fact: string;
      source: "USER_INPUT" | "INSTAGRAM" | "AI_INFERENCE";
    }>;
  };
  isCompleted: boolean;
}

