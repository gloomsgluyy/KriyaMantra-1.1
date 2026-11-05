"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { ScheduledPost, SchedulePostInput, UpdateScheduleInput } from "@/types/schedule";

const DEFAULT_BIZ_ID = "biz_sekar_jepun_01";

export function useSchedule(businessId: string = DEFAULT_BIZ_ID) {
  const queryClient = useQueryClient();

  const scheduleQuery = useQuery<ScheduledPost[]>({
    queryKey: queryKeys.schedule.posts(businessId),
    queryFn: async () => {
      return apiClient<ScheduledPost[]>("/api/schedule");
    },
    staleTime: 30 * 1000,
  });

  const createScheduleMutation = useMutation({
    mutationFn: (payload: SchedulePostInput) =>
      apiClient<ScheduledPost>("/api/schedule", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedule.posts(businessId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.summary(businessId),
      });
    },
  });

  const updateScheduleMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateScheduleInput }) =>
      apiClient<ScheduledPost>(`/api/schedule/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedule.posts(businessId),
      });
    },
  });

  const cancelScheduleMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<{ id: string; success: boolean }>(`/api/schedule/${encodeURIComponent(id)}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedule.posts(businessId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.summary(businessId),
      });
    },
  });

  const retryPostMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<{ id: string; status: string; message: string }>(
        `/api/schedule/${encodeURIComponent(id)}/retry`,
        { method: "POST" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedule.posts(businessId),
      });
    },
  });

  return {
    posts: scheduleQuery.data || [],
    isLoading: scheduleQuery.isLoading,
    isError: scheduleQuery.isError,
    error: scheduleQuery.error,
    refetch: scheduleQuery.refetch,
    schedulePost: createScheduleMutation.mutateAsync,
    isScheduling: createScheduleMutation.isPending,
    updateSchedule: updateScheduleMutation.mutateAsync,
    isUpdating: updateScheduleMutation.isPending,
    cancelSchedule: cancelScheduleMutation.mutateAsync,
    isCancelling: cancelScheduleMutation.isPending,
    retryPost: retryPostMutation.mutateAsync,
    isRetrying: retryPostMutation.isPending,
  };
}

