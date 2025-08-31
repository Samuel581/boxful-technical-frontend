export interface CreateOrderRequestDto {
    collectionAddress: string;
    destinationAddress: string;
    destinationFirstName: string;
    destinationLastName: string;
    destinationEmail: string;
    destinationPhone: string;
    department: string;
    province: string;
    addressReference: string;
    additionalNotes?: string;
    scheduledDate: string;
    products: ProductDataDto[];
  }
  
  export interface ProductDataDto {
    name: string;
    weight: number;
    length: number;
    height: number;
    width: number;
  }
  
  // DRY
  export interface OrderResponseDto extends CreateOrderRequestDto {
    id: string
  }