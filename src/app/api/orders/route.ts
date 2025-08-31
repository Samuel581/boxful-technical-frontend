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
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('[API GET] Error:', errorMessage);
    
    return NextResponse.json({
      message: "Failed to fetch orders",
      error: errorMessage
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
    
  } catch (error: unknown) {
    // Type-safe error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('[API POST] Error:', errorMessage);
    
    // Handle Axios errors specifically
    const isAxiosError = error && typeof error === 'object' && 'response' in error;
    if (isAxiosError && error.response && typeof error.response === 'object') {
      console.error('[API POST] Error response:', 'data' in error.response ? error.response.data : 'No data');
    }
    
    const status = isAxiosError && error.response && typeof error.response === 'object' && 'status' in error.response 
      ? (error.response.status as number) 
      : 500;
    
    const message = isAxiosError && error.response && typeof error.response === 'object' && 'data' in error.response &&
      error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data
      ? (error.response.data.message as string)
      : "Failed to create order";
    
    return NextResponse.json({ message }, { status });
  }
}