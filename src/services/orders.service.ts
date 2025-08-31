import { api } from "@/lib/api/axios";
import { Order } from "@/types/order";
import { CreateOrderRequestDto, OrderResponseDto } from "@/lib/dtos/order.dto"

export const ordersService = {
    async create(data: CreateOrderRequestDto): Promise<Omit<Order, 'userId'>>{
        const response = await api.post<OrderResponseDto>('orders', data)
        return response.data;
    },
    async getAll(): Promise<Omit<Order, 'userId'>[]>{
        const response = await api.get<OrderResponseDto[]>('orders')
        return response.data;
    }
}