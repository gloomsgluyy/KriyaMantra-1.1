import { NextResponse } from "next/server";
import { DemoStatus } from "@/types/demo";

const mockDemoStatus: DemoStatus = {
  isDemoMode: true,
  judgeTenantId: "tenant_judge_balidigifest_2026",
  crafterName: "Ibu Ketut Sekar",
  businessName: "Tenun Sekar Jepun",
  category: "Wastra Tenun Tradisional Bali",
  location: "Klungkung, Bali",
  seededAt: "2026-03-03T00:00:00Z",
  canReset: true,
};

export async function GET() {
  return NextResponse.json({
    data: mockDemoStatus,
    meta: {
      requestId: `req-${Date.now()}`,
    },
  });
}

