"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { GalleryPoster, GalleryFilter } from "@/types/gallery";

interface GalleryResponse {
  posters: GalleryPoster[];
  totalCount: number;
  publishedCount: number;
}

export function useGallery(filter: GalleryFilter = "all", businessId: string = "biz-sekar-jepun") {
  const queryClient = useQueryClient();

  const query = useQuery<GalleryResponse>({
    queryKey: queryKeys.gallery.list(businessId, filter),
    queryFn: async () => {
      const res = await fetch(`/api/gallery?filter=${filter}`);
      if (!res.ok) throw new Error("Gagal memuat galeri poster");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (posterId: string) => {
      const res = await fetch(`/api/gallery?id=${posterId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus poster");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gallery.list(businessId) });
    },
  });

  return {
    posters: query.data?.posters ?? [],
    totalCount: query.data?.totalCount ?? 0,
    publishedCount: query.data?.publishedCount ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    deletePoster: (id: string) => deleteMutation.mutate(id),
  };
}

