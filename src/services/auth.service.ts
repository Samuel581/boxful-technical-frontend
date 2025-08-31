import { api } from "@/lib/api/axios";
import { Login } from "@/types/login";
import { Register } from "@/types/register";

export const authService = {
    async register(){
        const response = await api.post<Register>('/auth/register')
        return response.data
    },

    async login(){
        const response = await api.post<Login>('/auth/login')
        return response.data
    }
}