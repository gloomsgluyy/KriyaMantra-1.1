/**
 * Modul DASH: Dashboard Ringkasan
 * Sesuai SRS_DASH_FE.md
 */

import { ScheduledPost } from "./schedule";

export interface DashboardSummary {
  businessId: string;
  businessName: string;
  totalPostsPublished: number;
  totalPostsScheduled: number;
  totalProductsCataloged: number;
  quotaRemaining: number;
  quotaTotal: number;
  instagramConnected: boolean;
  instagramHandle: string;
  upcomingPost?: ScheduledPost;
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  description: string;
  duration?: string;
  timeAgo: string;
  type: "approval" | "generation" | "publish" | "catalog" | "memory";
}

