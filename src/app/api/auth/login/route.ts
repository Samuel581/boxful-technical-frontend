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

    // Type-safe token extraction
    const token = 'accessToken' in data ? data.accessToken : 
                 'token' in data ? (data as AuthResponseDto & { token: string }).token : 
                 null;
    
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ message: "No token returned" }, { status: 500 });
    }

    const res = NextResponse.json({ ok: true, user: null }, { status });
    res.cookies.set(JWT_COOKIE_NAME, token, cookieOptions);
    return res;
    
  } catch (err: unknown) {
    // Type-safe error handling
    const isAxiosError = err && typeof err === 'object' && 'response' in err;
    const status = isAxiosError && err.response && typeof err.response === 'object' && 'status' in err.response 
      ? (err.response.status as number) 
      : 500;
    
    const message = isAxiosError && err.response && typeof err.response === 'object' && 'data' in err.response &&
      err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data
      ? (err.response.data.message as string)
      : "Login failed";
    
    return NextResponse.json({ message }, { status });
  }
}