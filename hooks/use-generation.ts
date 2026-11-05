"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import {
  ApproveGenerationInput,
  CreateGenerationInput,
  GenerationDetail,
  RevisionInput,
} from "@/types/generation";

const DEFAULT_BIZ_ID = "biz_sekar_jepun_01";

export function useGeneration(
  generationId: string = "gen-sekar-jepun-01",
  businessId: string = DEFAULT_BIZ_ID
) {
  const queryClient = useQueryClient();

  const generationQuery = useQuery<GenerationDetail>({
    queryKey: queryKeys.generations.review(businessId, generationId),
    queryFn: async () => {
      return apiClient<GenerationDetail>(
        `/api/generations/${encodeURIComponent(generationId)}/review`
      );
    },
    // Polling hanya aktif jika status belum terminal (queued / processing)
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === "queued" || data?.status === "processing") {
        return 3000;
      }
      return false;
    },
    staleTime: 15 * 1000,
  });

  const revisionMutation = useMutation({
    mutationFn: (payload: RevisionInput) =>
      apiClient<GenerationDetail>(
        `/api/generations/${encodeURIComponent(payload.generationId)}/revisions`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKeys.generations.review(businessId, generationId),
        data
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.generations.detail(businessId, generationId),
      });
    },
  });

  const approveMutation = useMutation({
    mutationFn: (payload: ApproveGenerationInput) =>
      apiClient<{ generation: GenerationDetail; scheduledDate: string; message: string }>(
        `/api/generations/${encodeURIComponent(payload.generationId)}/approve`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      ),
    onSuccess: (res) => {
      queryClient.setQueryData(
        queryKeys.generations.review(businessId, generationId),
        res.generation
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.generations.detail(businessId, generationId),
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateGenerationInput) =>
      apiClient<GenerationDetail>("/api/generations", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });

  return {
    generation: generationQuery.data,
    isLoading: generationQuery.isLoading,
    isError: generationQuery.isError,
    error: generationQuery.error,
    refetch: generationQuery.refetch,
    submitRevision: revisionMutation.mutateAsync,
    isRevising: revisionMutation.isPending,
    approveGeneration: approveMutation.mutateAsync,
    isApproving: approveMutation.isPending,
    createGeneration: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
}

