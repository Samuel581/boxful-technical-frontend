export interface User {
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
  
  export enum SEX {
    MALE,
    FEMALE
  }