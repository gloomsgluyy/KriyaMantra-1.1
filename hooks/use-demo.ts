"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { DemoStatus } from "@/types/demo";

export function useDemo() {
  const queryClient = useQueryClient();

  const demoQuery = useQuery<DemoStatus>({
    queryKey: queryKeys.demo.status(),
    queryFn: async () => {
      return apiClient<DemoStatus>("/api/demo/status");
    },
    staleTime: 60 * 1000,
  });

  const resetMutation = useMutation({
    mutationFn: () =>
      apiClient<{ success: boolean; message: string; resetAt: string }>(
        "/api/demo/reset",
        { method: "POST" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    demoStatus: demoQuery.data,
    isLoading: demoQuery.isLoading,
    isError: demoQuery.isError,
    error: demoQuery.error,
    resetDemo: resetMutation.mutateAsync,
    isResetting: resetMutation.isPending,
  };
}

