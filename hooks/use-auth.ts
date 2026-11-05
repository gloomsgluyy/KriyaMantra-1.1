"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { apiClient } from "@/lib/api-client";
import { UserSession, SignInCredentials, SignUpData, AuthResponseData } from "@/types/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const sessionQuery = useQuery<UserSession>({
    queryKey: queryKeys.auth.me(),
    queryFn: () => apiClient<UserSession>("/api/auth/me"),
    staleTime: 60_000,
    retry: false,
  });

  const signInMutation = useMutation({
    mutationFn: (credentials: SignInCredentials) =>
      apiClient<AuthResponseData>("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me(), data.user);
      router.push(data.redirectUrl || "/onboarding");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpData) =>
      apiClient<AuthResponseData>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me(), data.user);
      router.push(data.redirectUrl || "/onboarding");
    },
  });

  const signOutMutation = useMutation({
    mutationFn: () =>
      apiClient<{ success: boolean }>("/api/auth/signout", {
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.me(), null);
      queryClient.clear();
      router.push("/login");
    },
  });

  return {
    user: sessionQuery.data,
    isLoading: sessionQuery.isLoading,
    isAuthenticated: !!sessionQuery.data,
    signIn: signInMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,
    signInError: signInMutation.error,
    signUp: signUpMutation.mutateAsync,
    isSigningUp: signUpMutation.isPending,
    signUpError: signUpMutation.error,
    signOut: signOutMutation.mutateAsync,
    isSigningOut: signOutMutation.isPending,
  };
}

