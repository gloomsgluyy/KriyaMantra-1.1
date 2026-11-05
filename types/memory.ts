/**
 * Modul MEM: Profil, Brand Kit & Memori
 * Sesuai SRS_MEM_FE.md
 */

export type SourceProvenance = "USER_INPUT" | "AI_INFERENCE" | "IG_SYNC";

export interface VerifiedFact {
  id: string;
  fact: string;
  source: SourceProvenance;
  createdAt: string;
}

export interface BrandKit {
  palette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  brandVoice: string;
  targetAudience: string;
  moodDescription: string;
  typographyDescription: string;
}

export interface BusinessProfile {
  id: string;
  businessName: string;
  ownerName: string;
  category: string;
  location: string;
  phoneWhatsapp: string;
  storyPhilosophy: string;
  instagramHandle?: string;
  instagramConnected: boolean;
  brandKit: BrandKit;
  verifiedFacts: VerifiedFact[];
  boundedAiContext: string;
  updatedAt: string;
}

export interface ProfileUpdateInput {
  businessName?: string;
  ownerName?: string;
  category?: string;
  location?: string;
  phoneWhatsapp?: string;
  storyPhilosophy?: string;
  brandKit?: Partial<BrandKit>;
}

export interface MemoryCreateInput {
  fact: string;
  source?: SourceProvenance;
}

