import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/axios";
import { JWT_COOKIE_NAME, cookieOptions } from "@/lib/utils/auth";
import type { RegisterRequestDto } from "@/lib/dtos/auth.dto";

export async function POST(req: NextRequest) {
  console.log('[api/auth/register] route hit');
  
  const body = (await req.json()) as RegisterRequestDto;
  
  try {
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

    return NextResponse.json({ ok: true, user: null }, { status });
    
  } catch (err: unknown) {
    const isAxiosError = err && typeof err === 'object' && 'response' in err;
    const status = isAxiosError && err.response && typeof err.response === 'object' && 'status' in err.response 
      ? (err.response.status as number) 
      : 500;
    
    const message = isAxiosError && err.response && typeof err.response === 'object' && 'data' in err.response &&
      err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data
      ? (err.response.data.message as string)
      : "Registration failed";
    
    return NextResponse.json({ message }, { status });
  }
}