import { NextRequest, NextResponse } from "next/server";
import { ApiSuccess, ApiError } from "@/types/api";
import { AuthResponseData, UserSession } from "@/types/auth";

export async function POST(req: NextRequest) {
  const requestId = `req-auth-${Date.now()}`;

  try {
    const body = await req.json();
    const { email, password, isDemo } = body;

    if (!email) {
      const errorResp: ApiError = {
        error: {
          code: "VALIDATION_ERROR",
          message: "Email wajib diisi.",
          fieldErrors: { email: ["Email tidak boleh kosong"] },
          requestId,
        },
      };
      return NextResponse.json(errorResp, { status: 400 });
    }

    // Demo account for competition judges (F-AUTH-04)
    if (isDemo || email.toLowerCase().includes("juri") || email.toLowerCase().includes("demo")) {
      const demoUser: UserSession = {
        userId: "usr-demo-judge-bali",
        email: email || "juri.digifest@balidigifest.id",
        role: "DEMO_JUDGE",
        businessId: "biz-tenun-sekar-bali",
        businessName: "Tenun Ikat Sekar Jepun Klungkung",
        isDemo: true,
      };

      const responseData: ApiSuccess<AuthResponseData> = {
        data: {
          user: demoUser,
          redirectUrl: "/onboarding",
        },
        meta: { requestId },
      };

      const response = NextResponse.json(responseData);
      response.cookies.set("km_session", JSON.stringify(demoUser), {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
      });

      return response;
    }

    if (!password || password.length < 6) {
      const errorResp: ApiError = {
        error: {
          code: "VALIDATION_ERROR",
          message: "Kata sandi minimal 6 karakter.",
          fieldErrors: { password: ["Kata sandi terlalu pendek"] },
          requestId,
        },
      };
      return NextResponse.json(errorResp, { status: 400 });
    }

    // Crafter regular account
    const crafterUser: UserSession = {
      userId: `usr-${Buffer.from(email).toString("hex").slice(0, 10)}`,
      email,
      role: "CRAFTER",
      businessId: "biz-crafter-bali-01",
      businessName: "Pengerajin Tenun Tradisional Bali",
      isDemo: false,
    };

    const responseData: ApiSuccess<AuthResponseData> = {
      data: {
        user: crafterUser,
        redirectUrl: "/onboarding",
      },
      meta: { requestId },
    };

    const response = NextResponse.json(responseData);
    response.cookies.set("km_session", JSON.stringify(crafterUser), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch {
    const errorResp: ApiError = {
      error: {
        code: "INTERNAL_ERROR",
        message: "Terjadi kesalahan pada server autentikasi.",
        requestId,
      },
    };
    return NextResponse.json(errorResp, { status: 500 });
  }
}

