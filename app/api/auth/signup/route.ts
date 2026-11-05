import { NextRequest, NextResponse } from "next/server";
import { ApiSuccess, ApiError } from "@/types/api";
import { AuthResponseData, UserSession } from "@/types/auth";

export async function POST(req: NextRequest) {
  const requestId = `req-signup-${Date.now()}`;

  try {
    const body = await req.json();
    const { email, password, fullName, businessName } = body;

    const fieldErrors: Record<string, string[]> = {};
    if (!email) fieldErrors.email = ["Email wajib diisi"];
    if (!password || password.length < 6) fieldErrors.password = ["Kata sandi minimal 6 karakter"];
    if (!fullName) fieldErrors.fullName = ["Nama lengkap perajin wajib diisi"];
    if (!businessName) fieldErrors.businessName = ["Nama usaha / sanggar wajib diisi"];

    if (Object.keys(fieldErrors).length > 0) {
      const errorResp: ApiError = {
        error: {
          code: "VALIDATION_ERROR",
          message: "Data pendaftaran belum lengkap.",
          fieldErrors,
          requestId,
        },
      };
      return NextResponse.json(errorResp, { status: 400 });
    }

    const newUser: UserSession = {
      userId: `usr-${Date.now().toString(36)}`,
      email,
      role: "CRAFTER",
      businessId: `biz-${Date.now().toString(36)}`,
      businessName,
      isDemo: false,
    };

    const responseData: ApiSuccess<AuthResponseData> = {
      data: {
        user: newUser,
        redirectUrl: "/onboarding",
      },
      meta: { requestId },
    };

    const response = NextResponse.json(responseData);
    response.cookies.set("km_session", JSON.stringify(newUser), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch {
    const errorResp: ApiError = {
      error: {
        code: "INTERNAL_ERROR",
        message: "Gagal memproses pendaftaran akun.",
        requestId,
      },
    };
    return NextResponse.json(errorResp, { status: 500 });
  }
}

