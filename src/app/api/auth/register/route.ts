import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/axios";
import { JWT_COOKIE_NAME, cookieOptions } from "@/lib/utils/auth";
import type { RegisterRequestDto } from "@/lib/dtos/auth.dto";

export async function POST(req: NextRequest) {
  console.log('[api/auth/register] route hit');
  const body = (await req.json()) as RegisterRequestDto;
  
  try {
    // Convert form data to match backend expectations
    const backendData = {
      firstName: body.firstNames,
      lastName: body.lastNames,
      sex: body.sex,
      bornDate: body.bornDate,
      phone: body.phone,
      email: body.email,
      password: body.password,
    };

    const { data, status } = await api.post("/auth/register", backendData, {
      headers: { "Content-Type": "application/json" },
    });

    // For register, just return success (no token/login)
    return NextResponse.json({ ok: true, user: null }, { status });
  } catch (err: any) {
    const status = err?.response?.status ?? 500;
    const message = err?.response?.data?.message ?? "Registration failed";
    return NextResponse.json({ message }, { status });
  }
}