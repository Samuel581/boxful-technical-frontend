import { api } from "@/lib/api/axios";

export const usersService = {
    async profile(){
        const user = api.get('/users/profile')
    }
}