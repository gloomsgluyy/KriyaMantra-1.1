export type TaskPriority = "tinggi" | "sedang" | "rutin";
export type TaskCategory = "konten" | "interaksi" | "katalog" | "pameran";

export interface MarketingTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  isCompleted: boolean;
  dueDate: string;
  rewardPoints: number;
  actionUrl?: string;
  actionLabel?: string;
  estimatedMinutes?: number;
}

export interface WeeklyTaskProgress {
  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;
  totalPointsEarned: number;
  streakDays: number;
}

