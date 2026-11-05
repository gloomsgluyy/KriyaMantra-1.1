import { ApiError, ApiSuccess } from "@/types/api";

export class ApiRequestError extends Error {
  code: string;
  fieldErrors?: Record<string, string[]>;
  requestId: string;
  status: number;

  constructor(error: ApiError["error"], status: number) {
    super(error.message);
    this.name = "ApiRequestError";
    this.code = error.code;
    this.fieldErrors = error.fieldErrors;
    this.requestId = error.requestId;
    this.status = status;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : endpoint;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  const json = await response.json();

  if (!response.ok || ("error" in json && json.error)) {
    const errorData = (json as ApiError).error || {
      code: "UNKNOWN_ERROR",
      message: "Terjadi kesalahan pada sistem. Silakan coba lagi.",
      requestId: `req-${Date.now()}`,
    };
    throw new ApiRequestError(errorData, response.status);
  }

  const successData = json as ApiSuccess<T>;
  return successData.data;
}

