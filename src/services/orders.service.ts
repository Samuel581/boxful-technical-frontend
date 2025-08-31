import { api } from "@/lib/api/axios";
import { Order } from "@/types/order";

export const ordersService = {
    async create(){
        const order = api.post<Order>('orders')
        return order;
    },
    async getAll(){
        const orders = api.post<Order[]>('orders')
        return orders;
    }
}