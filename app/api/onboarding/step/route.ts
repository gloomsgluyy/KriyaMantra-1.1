import { NextRequest, NextResponse } from "next/server";
import { ApiSuccess } from "@/types/api";
import { OnboardingState } from "@/types/onboarding";

export async function POST(req: NextRequest) {
  const requestId = `req-onb-step-${Date.now()}`;
  const body = await req.json();

  const responseData: ApiSuccess<OnboardingState> = {
    data: {
      ...body,
      isCompleted: body.currentStep >= 5,
    },
    meta: { requestId },
  };

  return NextResponse.json(responseData);
}

