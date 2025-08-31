import type { Order } from "@/types/order";
import type { CreateOrderRequestDto, OrderResponseDto } from "@/lib/dtos/order.dto";

export const ordersService = {
  async create(data: CreateOrderRequestDto): Promise<Omit<Order, "userId">> {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json().catch(() => ({ message: "Failed to create order" }));
    return (await res.json()) as Omit<Order, "userId">;
  },

  async getAll(): Promise<Array<Omit<Order, "userId">>> {
    const res = await fetch("/api/orders", { cache: "no-store" });
    if (!res.ok) throw await res.json().catch(() => ({ message: "Failed to fetch orders" }));
    return (await res.json()) as Array<Omit<Order, "userId">>;
  },
};
