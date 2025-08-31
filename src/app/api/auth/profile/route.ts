import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import { api } from "@/lib/api/axios";
import { getJwtFromCookies, JWT_COOKIE_NAME, cookieOptions } from "@/lib/utils/auth";
import type { UserProfileResponseDto } from "@/lib/dtos/user.dto";

export async function GET() {
  const jwt = getJwtFromCookies();
  if (!jwt) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const resp = await api.get<UserProfileResponseDto>("/users/profile", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    // Optional rotation header, adapt if you have one
    const rotated = resp.headers["x-new-token"];
    const res = NextResponse.json(resp.data);
    if (rotated && typeof rotated === "string") res.cookies.set(JWT_COOKIE_NAME, rotated, cookieOptions);
    return res;
  } catch (err: unknown) {
    let status = 500;
    let message = "Failed to fetch profile";

    if (err instanceof AxiosError && err.response) {
      status = err.response.status ?? 500;
      message = err.response.data?.message ?? "Failed to fetch profile";
    }
    return NextResponse.json({ message }, { status });
  }
}
