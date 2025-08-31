import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/axios";
import { JWT_COOKIE_NAME, cookieOptions } from "@/lib/utils/auth";
import type { LoginRequestDto, AuthResponseDto } from "@/lib/dtos/auth.dto";

export async function POST(req: NextRequest) {
  console.log('[api/auth/login] route hit'); // <-- should appear on submit
  const body = (await req.json()) as LoginRequestDto;
  try {
    const { data, status } = await api.post<AuthResponseDto>("/auth/login", body, {
      headers: { "Content-Type": "application/json" },
    });

    // Adjust if your field is named differently (token/accessToken/jwt)
    const token = (data as any).accessToken ?? (data as any).token;
    if (!token) return NextResponse.json({ message: "No token returned" }, { status: 500 });

    const res = NextResponse.json({ ok: true, user: null }, { status });
    res.cookies.set(JWT_COOKIE_NAME, token, cookieOptions);
    return res;
  } catch (err: any) {
    const status = err?.response?.status ?? 500;
    const message = err?.response?.data?.message ?? "Login failed";
    return NextResponse.json({ message }, { status });
  }
}
