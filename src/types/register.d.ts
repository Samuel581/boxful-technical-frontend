export interface Register{
    id: string
    firstNames: string,
    lastNames: string,
    isActive: boolean
    sex: SEX,
    bornDate: Date,
    phone: string,
    email: string,
    password: string
}

enum SEX{
    MALE,
    FEMALE
}