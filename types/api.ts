/**
 * Shared API Response Types (per 00-CODEBASE-STANDARD.md Section 3)
 */

export type ApiSuccess<T> = {
  data: T;
  meta?: {
    requestId: string;
    nextCursor?: string | null;
  };
};

export type ApiError = {
  error: {
    code: string;
    message: string; // Aman ditampilkan ke user
    fieldErrors?: Record<string, string[]>;
    requestId: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export function isApiError<T>(response: ApiResponse<T>): response is ApiError {
  return "error" in response;
}

