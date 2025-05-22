export class UpdateInventoryDto {
    name?: string;
    description?: string;
    //sku?: string;
    condition?: 'Fair' | 'Good' | 'Very Good';
    qtyIn?: number;
    qtyOut?: number;
    unitPrice?: number;
    threshold: number;

  }
  