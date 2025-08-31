export interface Register{
    firstNames: string,
    lastNames: string,
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