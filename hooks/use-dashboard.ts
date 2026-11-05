"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { DashboardSummary, DashboardActivityItem } from "@/types/dashboard";

const DEFAULT_BIZ_ID = "biz_sekar_jepun_01";

export function useDashboard(businessId: string = DEFAULT_BIZ_ID) {
  const summaryQuery = useQuery<{
    summary: DashboardSummary;
    activities: DashboardActivityItem[];
  }>({
    queryKey: queryKeys.dashboard.summary(businessId),
    queryFn: async () => {
      return apiClient<{
        summary: DashboardSummary;
        activities: DashboardActivityItem[];
      }>("/api/dashboard/summary");
    },
    staleTime: 30 * 1000,
  });

  return {
    summary: summaryQuery.data?.summary,
    activities: summaryQuery.data?.activities || [],
    isLoading: summaryQuery.isLoading,
    isError: summaryQuery.isError,
    error: summaryQuery.error,
    refetch: summaryQuery.refetch,
  };
}

