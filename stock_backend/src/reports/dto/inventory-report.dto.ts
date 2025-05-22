export class InventoryReportDto {
  id: number;
  name: string;
  description: string;
  //sku: string;
  qtyIn: number;
  qtyOut: number;
  balanceQty: number;
  unitPrice: number;
  totalPrice: number;
} 