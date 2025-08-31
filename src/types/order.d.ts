export interface Order {
    id: string;
    userId: string;
    collectionAddress: string;
    destinationAddress: string;
    destinationFirstName: string;
    destinationLastName: string;
    destinationEmail: string;
    destinationPhone: string;
    department: string;
    province: string;
    reference: string;
    addressReference: string;
    additionalNotes?: string;
    scheduledDate: string;
    products: ProductData[];
}

export interface ProductData {
    name: string;
    weight: number;
    length: number;
    height: number;
    width: number;
}