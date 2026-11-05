"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { ChatMessage, SendMessageInput } from "@/types/chat";

const DEFAULT_BIZ_ID = "biz_sekar_jepun_01";
const DEFAULT_CONV_ID = "conv-1";

export function useChat(
  conversationId: string = DEFAULT_CONV_ID,
  businessId: string = DEFAULT_BIZ_ID
) {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery<ChatMessage[]>({
    queryKey: queryKeys.chat.messages(businessId, conversationId),
    queryFn: async () => {
      return apiClient<ChatMessage[]>(
        `/api/chat/messages?conversationId=${encodeURIComponent(conversationId)}`
      );
    },
    staleTime: 10 * 1000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (payload: SendMessageInput) =>
      apiClient<ChatMessage>("/api/chat/messages", {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          conversationId,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.chat.messages(businessId, conversationId),
      });
    },
  });

  return {
    messages: messagesQuery.data || [],
    isLoading: messagesQuery.isLoading,
    isError: messagesQuery.isError,
    error: messagesQuery.error,
    refetch: messagesQuery.refetch,
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
  };
}

