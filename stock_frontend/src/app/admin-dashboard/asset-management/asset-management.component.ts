import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddItemDialogComponent } from '../asset-management/add-item-dialog/add-item-dialog.component';
import { ActivatedRoute } from '@angular/router';

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
  total_price: number;
  threshold: number;
}

@Component({
  selector: 'app-asset-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTooltipModule,
    MatInputModule
  ],
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.scss']
})
export class AssetManagementComponent implements OnInit {
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
  showLowStockOnly: boolean = false;

  private apiUrl = 'http://localhost:3000/assets';

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if route has lowStock query param
    this.route.queryParams.subscribe(params => {
      this.showLowStockOnly = params['lowStock'] === 'true';
      this.loadAssets();
    });
  }

  loadAssets(): void {
    this.http.get<AssetItem[]>(this.apiUrl).subscribe(data => {
      this.assets = data.map(asset => ({
        ...asset,
        total_price: asset.unit_price * asset.balance_qty
      }));
      if (this.showLowStockOnly) {
        this.filteredAssets = this.assets.filter(asset =>
          asset.balance_qty <= (asset.threshold || 10)
        );
      } else {
        this.filteredAssets = [...this.assets];
      }
    });
  }

  filterAssets(): void {
    const query = this.searchQuery.toLowerCase();
    let filtered = this.assets.filter(asset =>
      asset.name.toLowerCase().includes(query) ||
      asset.number.toLowerCase().includes(query) ||
      asset.sku.toLowerCase().includes(query) ||
      asset.description.toLowerCase().includes(query)
    );
    if (this.showLowStockOnly) {
      filtered = filtered.filter(asset =>
        asset.balance_qty <= (asset.threshold || 10)
      );
    }
    this.filteredAssets = filtered;
  }

  addAsset(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newAsset = {
          name: result.name,
          description: result.description,
          sku: result.sku,
          condition: result.condition,
          qty_in: result.qtyIn,
          unit_price: result.unitPrice
        };

        this.http.post<AssetItem>(this.apiUrl, newAsset).subscribe(() => {
          this.loadAssets();
        });
      }
    });
  }

  editAsset(asset: AssetItem): void {
    const dialogData = {
      item: {
        name: asset.name,
        description: asset.description,
        sku: asset.sku,
        condition: asset.condition,
        qtyIn: asset.qty_in,
        qtyOut: asset.qty_out,
        unitPrice: asset.unit_price,
        totalPrice: asset.total_price,
        threshold: asset.threshold
      }
    };

    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '500px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatePayload = {
          name: result.name,
          description: result.description,
          sku: result.sku,
          condition: result.condition,
          qty_in: result.qtyIn,
          qty_out: result.qtyOut,
          unit_price: result.unitPrice,
          threshold: result.threshold
        };

        this.http.put(`${this.apiUrl}/${asset.id}`, updatePayload).subscribe(() => {
          this.loadAssets();
        });
      }
    });
  }
}