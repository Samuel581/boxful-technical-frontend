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

export function getUserIdFromJwt(jwt: string): string | null {
  try {
    // Decode JWT payload (second part)
    const payload = jwt.split('.')[1];
    if (!payload) return null;
    
    // Decode base64
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
    return decodedPayload.sub || null;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}
