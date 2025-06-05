import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';

interface InventoryItem {
  id: number;
  number: string;
  name: string;
  description: string;
  //sku: string;
  condition: 'Fair' | 'Good' | 'Very Good';
  qtyIn: number;
  qtyOut: number;
  balanceQty: number;
  unitPrice: number;
  totalPrice?: number; // calculated client-side
  threshold?: number; // Add threshold field
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  addStock(item: any): void {
    this.modifyProductQuantity(item, 'add');
  }
  removeStock(item: any): void {
    this.modifyProductQuantity(item, 'remove');
  }

  modifyProductQuantity(item: InventoryItem, action: 'add' | 'remove'): void {
    this.openQuantityDialog(item, action);
  }
  displayedColumns: string[] = [
    'number',
    'name',
    'description',
    'condition',
    'qtyIn',
    'qtyOut',
    'balanceQty',
    'status', 
    'unitPrice',
    'totalPrice',
    'actions'
  ];

  inventory: InventoryItem[] = [];
  filteredInventory: InventoryItem[] = [];
  searchQuery: string = '';
  private apiUrl = 'http://localhost:3000/inventory';
  showLowStockOnly: boolean = false;

  constructor(
    public dialog: MatDialog, 
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showLowStockOnly = params['lowStock'] === 'true';
      this.loadInventory();
    });
  }

  loadInventory(): void {
    this.http.get<InventoryItem[]>(this.apiUrl).subscribe(data => {
      // Recalculate totalPrice on load
      this.inventory = data.map(item => ({
        ...item,
        totalPrice: item.unitPrice * item.balanceQty
      }));
      
      // Apply low stock filter if needed
      if (this.showLowStockOnly) {
        this.filteredInventory = this.inventory.filter(item => 
          item.balanceQty <= (item.threshold || 10) // Default threshold of 10 if not specified
        );
      } else {
        this.filteredInventory = [...this.inventory];
      }
    });
  }

  filterInventory(): void {
    const query = this.searchQuery.toLowerCase();
    let filtered = this.inventory.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.number.toLowerCase().includes(query) ||
     // item.sku.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );

    // Apply low stock filter if needed
    if (this.showLowStockOnly) {
      filtered = filtered.filter(item => 
        item.balanceQty <= (item.threshold || 10)
      );
    }

    this.filteredInventory = filtered;
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterInventory();
  }

  openQuantityDialog(item: InventoryItem, action: 'add' | 'remove'): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '300px',
      data: {
        action,
        item: {
          balanceQty: item.balanceQty,
          unitPrice: item.unitPrice
        }
      }
    });

    dialogRef.afterClosed().subscribe(quantity => {
      if (quantity && quantity > 0) {
        const qtyChange = action === 'add' ? quantity : -quantity;

        const updatedItem: Partial<InventoryItem> = {
          qtyIn: item.qtyIn + (action === 'add' ? quantity : 0),
          qtyOut: item.qtyOut + (action === 'remove' ? quantity : 0),
          balanceQty: item.balanceQty + qtyChange,
          // totalPrice will be recalculated in frontend, so it's optional
        };

        this.http.put(`${this.apiUrl}/${item.id}`, updatedItem).subscribe(() => {
          this.loadInventory();
        });
      }
    });
  }
}
