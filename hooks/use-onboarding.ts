"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { OnboardingState } from "@/types/onboarding";
import { useRouter } from "next/navigation";

export function useOnboarding() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const stateQuery = useQuery<OnboardingState>({
    queryKey: ["onboarding", "state"],
    queryFn: () => apiClient<OnboardingState>("/api/onboarding/state"),
    staleTime: 60_000,
  });

  const saveStepMutation = useMutation({
    mutationFn: (stepData: Partial<OnboardingState>) =>
      apiClient<OnboardingState>("/api/onboarding/step", {
        method: "POST",
        body: JSON.stringify(stepData),
      }),
    onSuccess: (updatedState) => {
      queryClient.setQueryData(["onboarding", "state"], updatedState);
    },
  });

  const completeMutation = useMutation({
    mutationFn: (finalData: OnboardingState) =>
      apiClient<OnboardingState>("/api/onboarding/step", {
        method: "POST",
        body: JSON.stringify({ ...finalData, isCompleted: true, currentStep: 5 }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onboarding"] });
      router.push("/chat");
    },
  });

  return {
    state: stateQuery.data,
    isLoading: stateQuery.isLoading,
    saveStep: saveStepMutation.mutateAsync,
    isSaving: saveStepMutation.isPending,
    completeOnboarding: completeMutation.mutateAsync,
    isCompleting: completeMutation.isPending,
  };
}

