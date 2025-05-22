import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { InventoryReportDto } from './dto/inventory-report.dto';
import { AssetReportDto } from './dto/asset-report.dto';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-report1',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.scss'],
})
export class Report1Component implements OnInit {
  inventoryItems: InventoryReportDto[] = [];
  assetItems: AssetReportDto[] = [];

  selectedInventoryIds: number[] = [];
  selectedAssetIds: number[] = [];

  selectAllInventory = false;
  selectAllAssets = false;

  isLoadingInventory = false;
  isLoadingAssets = false;
  inventoryError = '';
  assetError = '';

  inventorySearchTerm = '';
  assetSearchTerm = '';

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInventoryItems();
    this.fetchAssetItems();
  }

  fetchInventoryItems(): void {
    this.isLoadingInventory = true;
    this.inventoryError = '';

    this.http.get<InventoryReportDto[]>('http://localhost:3000/reports/inventory-items')
      .subscribe({
        next: (items) => {
          this.inventoryItems = items;
          this.isLoadingInventory = false;
        },
        error: (error) => {
          console.error('Error fetching inventory items:', error);
          this.inventoryError = 'Failed to load inventory items. Please try again.';
          this.isLoadingInventory = false;
        }
      });
  }

  fetchAssetItems(): void {
    this.isLoadingAssets = true;
    this.assetError = '';

    this.http.get<AssetReportDto[]>('http://localhost:3000/reports/asset-items')
      .subscribe({
        next: (items) => {
          this.assetItems = items;
          this.isLoadingAssets = false;
        },
        error: (error) => {
          console.error('Error fetching asset items:', error);
          this.assetError = 'Failed to load asset items. Please try again.';
          this.isLoadingAssets = false;
        }
      });
  }

  toggleSelectAll(type: 'inventory' | 'asset'): void {
    if (type === 'inventory') {
      this.selectedInventoryIds = this.selectAllInventory ? this.inventoryItems.map(i => i.id) : [];
    } else if (type === 'asset') {
      this.selectedAssetIds = this.selectAllAssets ? this.assetItems.map(i => i.id) : [];
    }
  }

  toggleItemSelection(type: 'inventory' | 'asset', id: number): void {
    const selected = type === 'inventory' ? this.selectedInventoryIds : this.selectedAssetIds;
    const index = selected.indexOf(id);
    if (index > -1) selected.splice(index, 1);
    else selected.push(id);
  }

  filteredInventoryItems(): InventoryReportDto[] {
    const term = this.inventorySearchTerm.toLowerCase();
    return this.inventoryItems.filter(item =>
      item.name.toLowerCase().includes(term)
    );
  }

  filteredAssetItems(): AssetReportDto[] {
    const term = this.assetSearchTerm.toLowerCase();
    return this.assetItems.filter(item =>
      item.name.toLowerCase().includes(term)
    );
  }

  generateInventoryReport(): void {
    const selectedItems = this.inventoryItems
      .filter(item => this.selectedInventoryIds.includes(item.id))
      .map(item => item.name);

    this.dialog.open(ReportDialogComponent, {
      width: '600px',
      data: {
        items: selectedItems,
        type: 'Inventory'
      },
    });
  }

  generateAssetReport(): void {
    const selectedItems = this.assetItems
      .filter(item => this.selectedAssetIds.includes(item.id))
      .map(item => item.name);

    this.dialog.open(ReportDialogComponent, {
      width: '600px',
      data: {
        items: selectedItems,
        type: 'Asset'
      },
    });
  }
}
