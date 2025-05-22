export class CreateInventoryDto {
    name: string;
    description: string;
    //sku: string;
    condition: 'Fair' | 'Good' | 'Very Good';
    qtyIn: number;
    unitPrice: number;
    threshold: number;

  }
  