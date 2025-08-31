import type { RegisterRequestDto, LoginRequestDto } from "@/lib/dtos/auth.dto";
import type { Register } from "@/types/register";
import type { User } from "@/types/user";

// What the client receives back from our Next API (no token)
type AuthUser = { user: User | null; ok?: boolean };
type Fail = { message: string };

export const authService = {
  async register(data: RegisterRequestDto): Promise<AuthUser> {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw (await res.json().catch(() => ({ message: "Registration failed" }))) as Fail;
    return (await res.json()) as AuthUser;
  },

  async login(data: LoginRequestDto): Promise<AuthUser> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw (await res.json().catch(() => ({ message: "Invalid credentials" }))) as Fail;
    return (await res.json()) as AuthUser;
  },
};
