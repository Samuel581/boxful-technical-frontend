import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/axios";
import { getJwtFromCookies } from "@/lib/utils/auth";
import type { CreateOrderRequestDto, OrderResponseDto } from "@/lib/dtos/order.dto";

export async function GET(req: NextRequest) {
  const jwt = getJwtFromCookies();
  if (!jwt) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const qs = new URL(req.url).searchParams.toString();
  const resp = await api.get<OrderResponseDto[]>(`/orders${qs ? `?${qs}` : ""}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return NextResponse.json(resp.data);
}

export async function POST(req: NextRequest) {
  const jwt = getJwtFromCookies();
  if (!jwt) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as CreateOrderRequestDto;
  const resp = await api.post<OrderResponseDto>("/orders", body, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
  });
  return NextResponse.json(resp.data, { status: 201 });
}
