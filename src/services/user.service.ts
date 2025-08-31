import type { User } from "@/types/user";

export const usersService = {
  async profile(): Promise<User> {
    const res = await fetch("/api/users/profile", { cache: "no-store" });
    if (!res.ok) throw await res.json().catch(() => ({ message: "Failed to fetch profile" }));
    return (await res.json()) as User;
  },
};
