/**
 * Modul DEMO: Mode Juri/Demo
 * Sesuai SRS_DEMO_FE.md
 */

export interface DemoStatus {
  isDemoMode: boolean;
  judgeTenantId: string;
  crafterName: string;
  businessName: string;
  category: string;
  location: string;
  seededAt: string;
  canReset: boolean;
}

export interface TourStep {
  id: string;
  title: string;
  route: string;
  description: string;
  badgeText: string;
  completed?: boolean;
}

