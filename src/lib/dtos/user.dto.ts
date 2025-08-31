export interface UserProfileResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    sex: SEX;
    bornDate: Date; 
    phone: string;
    email: string;
    createdAt: Date; 
    updatedAt: Date; 
}

enum SEX{
    MALE, FEMALE
}