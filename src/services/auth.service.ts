import { api } from "@/lib/api/axios";
import { Login } from "@/types/login";
import { Register } from "@/types/register";
import {RegisterRequestDto, LoginRequestDto, AuthResponseDto } from"@/lib/dtos/auth.dto";

export const authService = {
    async register(data: RegisterRequestDto): Promise<Omit<Register, 'password'>>{
        const response = await api.post<AuthResponseDto>('/auth/register', data)
        return response.data
    },

    async login(data: LoginRequestDto): Promise<AuthResponseDto>{
        const response = await api.post<AuthResponseDto>('/auth/login', data)
        return response.data
    }
}