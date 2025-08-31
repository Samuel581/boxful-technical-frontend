import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/axios";
import { getJwtFromCookies, getUserIdFromJwt } from "@/lib/utils/auth";
import type { CreateOrderRequestDto, OrderResponseDto } from "@/lib/dtos/order.dto";

export async function GET(req: NextRequest) {
  try {
    const jwt = await getJwtFromCookies();
    console.log('[API GET] JWT exists:', !!jwt);
    console.log('[API GET] JWT value:', jwt ? jwt.substring(0, 50) + '...' : 'null');
    
    if (!jwt) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const qs = new URL(req.url).searchParams.toString();
    console.log('[API GET] Calling backend /orders with query:', qs);
    
    const resp = await api.get<OrderResponseDto[]>(`/orders${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    
    return NextResponse.json(resp.data);
  } catch (error: any) {
    console.error('[API GET] Error:', error.message);
    return NextResponse.json({ 
      message: "Failed to fetch orders",
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const jwt = await getJwtFromCookies();
    console.log('[API POST] JWT exists:', !!jwt);
    console.log('[API POST] JWT value:', jwt ? jwt.substring(0, 50) + '...' : 'null');
    
    if (!jwt) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as CreateOrderRequestDto;
    const userId = getUserIdFromJwt(jwt);
    console.log('[API POST] Request body received');
    console.log('[API POST] User ID from JWT:', userId);
    console.log('[API POST] Calling backend /orders');
    
    // Add userId to the request body
    const orderData = {
      ...body,
      userId: userId
    };
    
    const resp = await api.post<OrderResponseDto>("/orders", orderData, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    });
    
    console.log('[API POST] Success');
    return NextResponse.json(resp.data, { status: 201 });
  } catch (error: any) {
    console.error('[API POST] Error:', error.message);
    console.error('[API POST] Error response:', error.response?.data);
    
    const status = error?.response?.status ?? 500;
    const message = error?.response?.data?.message ?? "Failed to create order";
    
    return NextResponse.json({ message }, { status });
  }
}