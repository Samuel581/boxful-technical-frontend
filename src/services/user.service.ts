import { api } from "@/lib/api/axios";
import { UserProfileResponseDto } from "@/lib/dtos/user.dto";
import {User} from "@/types/user"

export const usersService = {
    async profile(): Promise<User>{
        const response = await api.get<UserProfileResponseDto>('/users/profile')
        return response.data;
    }
}