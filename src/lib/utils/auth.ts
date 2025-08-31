import { cookies } from "next/headers";

export const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || "access_token";

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function getJwtFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(JWT_COOKIE_NAME)?.value || null;
}
