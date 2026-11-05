"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { BusinessProfile, ProfileUpdateInput, VerifiedFact, MemoryCreateInput } from "@/types/memory";

const DEFAULT_BIZ_ID = "biz_sekar_jepun_01";

export function useProfile(businessId: string = DEFAULT_BIZ_ID) {
  const queryClient = useQueryClient();

  // Read Profile & Brand Kit
  const profileQuery = useQuery<BusinessProfile>({
    queryKey: queryKeys.business.profile(businessId),
    queryFn: () => apiClient<BusinessProfile>("/api/profile"),
    staleTime: 60 * 1000,
  });

  // Update Profile & Brand Kit
  const updateProfileMutation = useMutation({
    mutationFn: (payload: ProfileUpdateInput) =>
      apiClient<BusinessProfile>("/api/profile", {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.business.profile(businessId), updated);
      queryClient.invalidateQueries({ queryKey: queryKeys.business.profile(businessId) });
    },
  });

  // Read Verified Facts / Memory
  const memoryQuery = useQuery<VerifiedFact[]>({
    queryKey: queryKeys.memory.list(businessId),
    queryFn: () => apiClient<VerifiedFact[]>("/api/profile/memory"),
    staleTime: 30 * 1000,
  });

  // Add Memory Fact
  const addMemoryMutation = useMutation({
    mutationFn: (payload: MemoryCreateInput) =>
      apiClient<VerifiedFact>("/api/profile/memory", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.memory.list(businessId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.business.profile(businessId) });
    },
  });

  // Delete Memory Fact
  const deleteMemoryMutation = useMutation({
    mutationFn: (memoryId: string) =>
      apiClient<{ id: string; deleted: boolean }>(
        `/api/profile/memory?id=${encodeURIComponent(memoryId)}`,
        { method: "DELETE" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.memory.list(businessId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.business.profile(businessId) });
    },
  });

  return {
    profile: profileQuery.data,
    isLoadingProfile: profileQuery.isLoading,
    profileError: profileQuery.error,

    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,

    memoryFacts: memoryQuery.data || profileQuery.data?.verifiedFacts || [],
    isLoadingMemory: memoryQuery.isLoading,

    addMemory: addMemoryMutation.mutateAsync,
    isAddingMemory: addMemoryMutation.isPending,

    deleteMemory: deleteMemoryMutation.mutateAsync,
    isDeletingMemory: deleteMemoryMutation.isPending,
  };
}
