"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { MarketingTask, WeeklyTaskProgress } from "@/types/task";

interface TasksResponse {
  tasks: MarketingTask[];
  progress: WeeklyTaskProgress;
}

export function useTasks(businessId: string = "biz-sekar-jepun") {
  const queryClient = useQueryClient();

  const query = useQuery<TasksResponse>({
    queryKey: queryKeys.tasks.weekly(businessId),
    queryFn: async () => {
      const res = await fetch("/api/tasks/weekly");
      if (!res.ok) throw new Error("Gagal memuat tugas pemasaran");
      return res.json();
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ taskId, isCompleted }: { taskId: string; isCompleted: boolean }) => {
      const res = await fetch("/api/tasks/weekly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, isCompleted }),
      });
      if (!res.ok) throw new Error("Gagal memperbarui status tugas");
      return res.json();
    },
    onMutate: async ({ taskId, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.tasks.weekly(businessId) });
      const previous = queryClient.getQueryData<TasksResponse>(queryKeys.tasks.weekly(businessId));

      if (previous) {
        const updatedTasks = previous.tasks.map((t) =>
          t.id === taskId ? { ...t, isCompleted } : t
        );
        const completedCount = updatedTasks.filter((t) => t.isCompleted).length;
        queryClient.setQueryData<TasksResponse>(queryKeys.tasks.weekly(businessId), {
          ...previous,
          tasks: updatedTasks,
          progress: {
            ...previous.progress,
            completedTasks: completedCount,
            progressPercentage: Math.round((completedCount / updatedTasks.length) * 100),
          },
        });
      }

      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.tasks.weekly(businessId), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.weekly(businessId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.summary(businessId) });
    },
  });

  return {
    tasks: query.data?.tasks ?? [],
    progress: query.data?.progress ?? {
      totalTasks: 0,
      completedTasks: 0,
      progressPercentage: 0,
      totalPointsEarned: 0,
      streakDays: 0,
    },
    isLoading: query.isLoading,
    isError: query.isError,
    toggleTask: (taskId: string, isCompleted: boolean) =>
      toggleMutation.mutate({ taskId, isCompleted }),
  };
}

