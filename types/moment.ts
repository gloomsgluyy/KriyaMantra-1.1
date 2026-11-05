export type MomentCategory = "keagamaan" | "seni_budaya" | "pameran";

export interface CulturalMoment {
  id: string;
  name: string;
  balineseName: string;
  date: string;
  dayRemaining: number;
  category: MomentCategory;
  description: string;
  marketingTip: string;
  suggestedPrompt: string;
  badgeLabel: string;
  badgeColor: string;
}

