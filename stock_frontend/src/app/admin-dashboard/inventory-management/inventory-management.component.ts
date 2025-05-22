import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AddItemDialogComponent } from '../inventory-management/add-item-dialog/add-item-dialog.component';

interface InventoryItem {
  id: number;
  number: string;
  name: string;
  description: string;
  condition: 'Fair' | 'Good' | 'Very Good';
  qtyIn: number;
  qtyOut: number;
  balanceQty: number;
  unitPrice: number;
  totalPrice: number;
  threshold: number; // ➕ NEW: low stock threshold
}

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss']
})
export class InventoryManagementComponent implements OnInit {
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

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.http.get<InventoryItem[]>(this.apiUrl).subscribe(data => {
      this.inventory = data.map(item => ({
        ...item,
        totalPrice: item.unitPrice * item.balanceQty
      }));
      this.filteredInventory = [...this.inventory];
    });
  }

  filterInventory(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredInventory = this.inventory.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.number.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }

  addInventory(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newInventoryItem: InventoryItem = {
          id: 0,
          number: '',
          ...result,
          qtyOut: 0,
          balanceQty: result.qtyIn,
          totalPrice: result.qtyIn * result.unitPrice
        };

        this.http.post<InventoryItem>(this.apiUrl, newInventoryItem).subscribe(() => {
          this.loadInventory();
        });
      }
    });
  }

  editInventoryItem(item: InventoryItem): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '500px',
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedItem: Partial<InventoryItem> = {
          ...result,
          balanceQty: result.qtyIn - item.qtyOut,
          totalPrice: result.qtyIn * result.unitPrice
        };

        this.http.put(`${this.apiUrl}/${item.id}`, updatedItem).subscribe(() => {
          this.loadInventory();
        });
      }
    });
  }
}
