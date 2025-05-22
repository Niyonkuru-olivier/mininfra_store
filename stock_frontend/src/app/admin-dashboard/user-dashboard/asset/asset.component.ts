import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddStockDialogComponent } from './add-stock-dialog/add-stock-dialog.component';

interface AssetItem {
  id: number;
  number: string;
  name: string;
  description: string;
  sku: string;
  condition: 'Fair' | 'Good' | 'Very Good';
  qty_in: number;
  qty_out: number;
  balance_qty: number;
  unit_price: number;
  total_price?: number; // optional, we compute it ourselves
}

@Component({
  selector: 'app-asset',
  standalone: true,
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
  ]
})
export class AssetComponent implements OnInit {
  displayedColumns: string[] = [
    'number',
    'name',
    'description',
    'sku',
    'condition',
    'qty_in',
    'qty_out',
    'balance_qty',
    'status', 
    'unit_price',
    'total_price',
    'actions'
  ];

  assets: AssetItem[] = [];
  filteredAssets: AssetItem[] = [];
  searchQuery: string = '';
  private apiUrl = 'http://localhost:3000/assets';

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.http.get<AssetItem[]>(this.apiUrl).subscribe(data => {
      // Compute total_price on the client side
      this.assets = data.map(asset => ({
        ...asset,
        total_price: asset.unit_price * asset.balance_qty
      }));
      this.filteredAssets = [...this.assets];
    });
  }

  filterAssets(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredAssets = this.assets.filter(asset =>
      asset.name.toLowerCase().includes(query) ||
      asset.number.toLowerCase().includes(query) ||
      asset.sku.toLowerCase().includes(query) ||
      asset.description.toLowerCase().includes(query)
    );
  }

  openAddRemoveDialog(asset: AssetItem, action: 'add' | 'remove'): void {
    const dialogRef = this.dialog.open(AddStockDialogComponent, {
      width: '400px',
      data: {
        action,
        item: { ...asset }
      }
    });

    dialogRef.afterClosed().subscribe((quantity: number) => {
      if (typeof quantity === 'number' && quantity > 0) {
        const updatedAsset: AssetItem = { ...asset };

        if (action === 'add') {
          updatedAsset.qty_in += quantity;
        } else {
          updatedAsset.qty_out += quantity;
        }

        updatedAsset.balance_qty = updatedAsset.qty_in - updatedAsset.qty_out;
        updatedAsset.total_price = updatedAsset.balance_qty * updatedAsset.unit_price;

        this.http.put(`${this.apiUrl}/${asset.id}`, updatedAsset).subscribe(() => {
          this.loadAssets();
        });
      }
    });
  }
}
