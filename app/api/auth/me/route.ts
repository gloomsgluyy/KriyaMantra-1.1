import { NextRequest, NextResponse } from "next/server";
import { ApiSuccess, ApiError } from "@/types/api";
import { UserSession } from "@/types/auth";

export async function GET(req: NextRequest) {
  const requestId = `req-me-${Date.now()}`;
  const sessionCookie = req.cookies.get("km_session");

  if (!sessionCookie?.value) {
    const errorResp: ApiError = {
      error: {
        code: "UNAUTHENTICATED",
        message: "Sesi Anda telah berakhir. Silakan masuk kembali.",
        requestId,
      },
    };
    return NextResponse.json(errorResp, { status: 401 });
  }

  try {
    const userSession = JSON.parse(sessionCookie.value) as UserSession;
    const responseData: ApiSuccess<UserSession> = {
      data: userSession,
      meta: { requestId },
    };
    return NextResponse.json(responseData);
  } catch {
    const errorResp: ApiError = {
      error: {
        code: "UNAUTHENTICATED",
        message: "Sesi tidak valid.",
        requestId,
      },
    };
    return NextResponse.json(errorResp, { status: 401 });
  }
}

