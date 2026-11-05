"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { Product, ProductCreateInput, ProductUpdateInput, PromotionStatus } from "@/types/product";

const DEFAULT_BIZ_ID = "biz_sekar_jepun_01";

interface ProductsFilter {
  status?: PromotionStatus | "all";
  q?: string;
}

export function useProducts(
  filter: ProductsFilter = { status: "all" },
  businessId: string = DEFAULT_BIZ_ID
) {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<{
    products: Product[];
    counts: {
      all: number;
      never_promoted: number;
      scheduled: number;
      published: number;
    };
  }>({
    queryKey: queryKeys.products.list(businessId, filter as Record<string, unknown>),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter.status && filter.status !== "all") {
        params.set("status", filter.status);
      }
      if (filter.q) {
        params.set("q", filter.q);
      }

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const products = await apiClient<Product[]>(`/api/products${queryString}`);
      return {
        products,
        counts: {
          all: products.length,
          never_promoted: products.filter((p: Product) => p.promotionStatus === "never_promoted").length,
          scheduled: products.filter((p: Product) => p.promotionStatus === "scheduled").length,
          published: products.filter((p: Product) => p.promotionStatus === "published").length,
        },
      };
    },
    staleTime: 30 * 1000,
  });

  const createProductMutation = useMutation({
    mutationFn: (payload: ProductCreateInput) =>
      apiClient<Product>("/api/products", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", businessId] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductUpdateInput }) =>
      apiClient<Product>(`/api/products/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", businessId] });
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(businessId, variables.id),
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) =>
      apiClient<{ id: string; deleted: boolean }>(
        `/api/products/${encodeURIComponent(productId)}`,
        { method: "DELETE" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", businessId] });
    },
  });

  return {
    products: productsQuery.data?.products || [],
    counts: productsQuery.data?.counts || { all: 0, never_promoted: 0, scheduled: 0, published: 0 },
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    refetch: productsQuery.refetch,

    createProduct: createProductMutation.mutateAsync,
    isCreating: createProductMutation.isPending,

    updateProduct: updateProductMutation.mutateAsync,
    isUpdating: updateProductMutation.isPending,

    deleteProduct: deleteProductMutation.mutateAsync,
    isDeleting: deleteProductMutation.isPending,
  };
}
