import { NextResponse } from "next/server";
import { ChatConversation } from "@/types/chat";

const mockConversations: ChatConversation[] = [
  {
    id: "conv-1",
    businessId: "biz_sekar_jepun_01",
    title: "Kreasi Poster Tenun Sutra Alam",
    lastMessageSnippet: "3 opsi poster telah siap. Buka studio untuk meninjau...",
    createdAt: "2026-03-03T08:00:00Z",
    updatedAt: "2026-03-03T08:15:00Z",
  },
];

export async function GET() {
  return NextResponse.json({
    data: mockConversations,
    meta: {
      requestId: `req-${Date.now()}`,
    },
  });
}

