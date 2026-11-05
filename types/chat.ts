/**
 * Modul CHAT: Chat Agent
 * Sesuai SRS_CHAT_FE.md
 */

export type ChatRole = "user" | "assistant" | "system";

export type AttachmentType = "image" | "product" | "voice";

export interface ChatAttachment {
  id: string;
  type: AttachmentType;
  url: string;
  name?: string;
  productId?: string;
  durationSeconds?: number;
}

export interface PosterOptionPayload {
  id: string;
  generationId: string;
  title: string;
  thumbnailUrl: string;
  aspectRatio: "4:5" | "9:16";
  captionPreview: string;
  uniquenessScore: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: ChatRole;
  content: string;
  attachment?: ChatAttachment;
  posterOptions?: PosterOptionPayload[];
  isProcessing?: boolean;
  processingStep?: string;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  businessId: string;
  title: string;
  lastMessageSnippet?: string;
  updatedAt: string;
  createdAt: string;
}

export interface SendMessageInput {
  conversationId?: string;
  content: string;
  attachment?: {
    type: AttachmentType;
    url: string;
    name?: string;
    productId?: string;
  };
}

