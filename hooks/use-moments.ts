"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { CulturalMoment } from "@/types/moment";

interface MomentsResponse {
  moments: CulturalMoment[];
  totalCount: number;
}

export function useMoments() {
  const query = useQuery<MomentsResponse>({
    queryKey: queryKeys.moments.calendar(),
    queryFn: async () => {
      const res = await fetch("/api/moments");
      if (!res.ok) throw new Error("Gagal memuat kalender momen budaya");
      return res.json();
    },
  });

  return {
    moments: query.data?.moments ?? [],
    totalCount: query.data?.totalCount ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

