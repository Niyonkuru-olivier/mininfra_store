import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AssetItem {
  id?: number;
  number?: string;
  name: string;
  description: string;
  sku: string;
  condition: 'Fair' | 'Good' | 'Very Good';
  qtyIn: number;
  qtyOut?: number;
  balanceQty?: number;
  unitPrice: number;
  totalPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = 'http://localhost:3000/assets';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<AssetItem[]> {
    return this.http.get<AssetItem[]>(this.apiUrl);
  }

  addAsset(asset: AssetItem): Observable<AssetItem> {
    return this.http.post<AssetItem>(this.apiUrl, asset);
  }

  updateAsset(id: number, asset: Partial<AssetItem>): Observable<AssetItem> {
    return this.http.put<AssetItem>(`${this.apiUrl}/${id}`, asset);
  }
}
