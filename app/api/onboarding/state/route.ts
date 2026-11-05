import { NextRequest, NextResponse } from "next/server";
import { ApiSuccess } from "@/types/api";
import { OnboardingState } from "@/types/onboarding";

// In-memory tenant onboarding state for demo/session
const onboardingStates: Record<string, OnboardingState> = {};

export async function GET(req: NextRequest) {
  const requestId = `req-onb-state-${Date.now()}`;
  const sessionCookie = req.cookies.get("km_session");
  const tenantId = sessionCookie?.value ? JSON.parse(sessionCookie.value).businessId : "default-crafter";

  const defaultState: OnboardingState = {
    currentStep: 1,
    businessInfo: {
      businessName: "Tenun Ikat Sekar Jepun",
      category: "tenun_endek",
      location: "Klungkung, Bali",
      description: "Pembuatan kain tenun ikat endek tradisional Bali dengan pewarna alami tanaman lokal.",
    },
    aiConsent: {
      accepted: false,
    },
    sourceSelection: {
      selectedSource: "catalog_upload",
    },
    profileDraft: {
      brandVoice: "Hangat, menghargai tradisi leluhur, autentik, dan ramah wisatawan",
      targetAudience: "Pencinta kain wastra nusantara, kolektor seni, dan wisatawan mancanegara",
      speciality: "Kain endek sutra motif Sekar Jepun khas Klungkung",
      verifiedFacts: [
        { fact: "Didirikan oleh keluarga perajin generasi ketiga sejak 1988", source: "USER_INPUT" },
        { fact: "Menggunakan 100% pewarna indigo dan kulit kayu alami", source: "USER_INPUT" },
        { fact: "Produk unggulan: Selendang & Sarung Tenun Sutra Alam", source: "AI_INFERENCE" },
      ],
    },
    isCompleted: false,
  };

  const state = onboardingStates[tenantId] || defaultState;

  const responseData: ApiSuccess<OnboardingState> = {
    data: state,
    meta: { requestId },
  };

  return NextResponse.json(responseData);
}

