/**
 * Stable query keys for Kriyamantra modules
 * Rule: Tuple with domain, businessId, and resource params
 * Secret / token must NEVER be included in query keys
 */
export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
    session: () => ["auth", "session"] as const,
  },
  business: {
    detail: (businessId: string) => ["business", businessId] as const,
    profile: (businessId: string) => ["business", businessId, "profile"] as const,
  },
  memory: {
    list: (businessId: string) => ["memory", businessId] as const,
    item: (businessId: string, memoryId: string) => ["memory", businessId, memoryId] as const,
  },
  products: {
    list: (businessId: string, filter?: Record<string, unknown>) =>
      ["products", businessId, filter ?? {}] as const,
    detail: (businessId: string, productId: string) =>
      ["products", businessId, productId] as const,
  },
  chat: {
    conversations: (businessId: string) =>
      ["chat", businessId, "conversations"] as const,
    messages: (businessId: string, conversationId: string) =>
      ["chat", businessId, "messages", conversationId] as const,
  },
  generations: {
    list: (businessId: string) =>
      ["generations", businessId] as const,
    detail: (businessId: string, generationId: string) =>
      ["generations", businessId, generationId] as const,
    status: (businessId: string, generationId: string) =>
      ["generations", businessId, generationId, "status"] as const,
    options: (businessId: string, generationId: string) =>
      ["generations", businessId, generationId, "options"] as const,
    review: (businessId: string, generationId: string) =>
      ["generations", businessId, generationId, "review"] as const,
  },
  schedule: {
    posts: (businessId: string, monthYear?: string) =>
      ["schedule", businessId, monthYear ?? "current"] as const,
  },
  tasks: {
    weekly: (businessId: string) =>
      ["tasks", businessId, "weekly"] as const,
  },
  gallery: {
    list: (businessId: string, filter?: string) =>
      ["gallery", businessId, filter ?? "all"] as const,
    detail: (businessId: string, posterId: string) =>
      ["gallery", businessId, posterId] as const,
  },
  dashboard: {
    summary: (businessId: string) =>
      ["dashboard", businessId, "summary"] as const,
    activity: (businessId: string) =>
      ["dashboard", businessId, "activity"] as const,
  },
  moments: {
    calendar: () => ["moments", "calendar"] as const,
  },
  quota: {
    usage: (businessId: string) => ["quota", businessId] as const,
  },
  demo: {
    status: () => ["demo", "status"] as const,
  },
};

