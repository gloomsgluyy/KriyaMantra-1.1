/**
 * Type definitions for Authentication (SRS_AUTH_FE & 00-CODEBASE-STANDARD.md)
 */

export type UserRole = "CRAFTER" | "DEMO_JUDGE" | "ADMIN" | "ADVISOR";

export interface UserSession {
  userId: string;
  email: string;
  role: UserRole;
  businessId: string | null;
  businessName?: string;
  isDemo?: boolean;
}

export interface SignInCredentials {
  email: string;
  password?: string;
  isDemo?: boolean;
}

export interface SignUpData {
  email: string;
  password?: string;
  fullName: string;
  businessName: string;
  phone?: string;
}

export interface AuthResponseData {
  user: UserSession;
  redirectUrl: string;
}

