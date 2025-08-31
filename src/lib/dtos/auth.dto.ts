export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface RegisterRequestDto {
    firstNames: string;
    lastNames: string;
    sex: SEX;
    bornDate: Date;
    phone: string;
    email: string;
    password: string;
}

export interface AuthResponseDto {
    id: string;
    firstNames: string;
    lastNames: string;
    isActive: boolean;
    sex: SEX;
    bornDate: Date;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    token?: string;
}

enum SEX {
    MALE,
    FEMALE
}
