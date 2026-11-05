import { NextResponse } from "next/server";
import { ApiSuccess } from "@/types/api";

export async function POST() {
  const requestId = `req-signout-${Date.now()}`;
  const responseData: ApiSuccess<{ success: boolean }> = {
    data: { success: true },
    meta: { requestId },
  };

  const response = NextResponse.json(responseData);
  response.cookies.delete("km_session");
  return response;
}

