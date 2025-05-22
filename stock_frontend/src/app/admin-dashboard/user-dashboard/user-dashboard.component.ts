import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AddItemDialogComponent } from '../user-dashboard/add-item-dialog/add-item-dialog.component'; // Adjust the path as needed
import { AdjustStockDialogComponent } from '../user-dashboard/adjust-stock-dialog/adjust-stock-dialog.component'; // Adjust the path as needed
import { ReportDialogComponent } from '../user-dashboard/report-dialog/report-dialog.component'; // Adjust the path as needed
import { LogoutConfirmationDialogComponent } from '../logout-confirmation-dialog/logout-confirmation-dialog.component';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  threshold: number;
  description: string;
  lastUpdated: string;
}

interface Transaction {
  id: number;
  date: string;
  itemId: number;
  itemName: string;
  type: 'add' | 'remove' | 'update';
  quantity: number;
  user: string;
  reason: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    DatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDialogModule,
    MatSortModule
  ]
})
export class UserDashboardComponent implements OnInit {
  // Sample Data
  inventoryItems: InventoryItem[] = [
    { 
      id: 1, 
      name: "Laptop", 
      category: "Electronics", 
      quantity: 15, 
      threshold: 5, 
      description: "Dell XPS 15", 
      lastUpdated: new Date().toISOString() 
    },
    { 
      id: 2, 
      name: "Desk Chair", 
      category: "Furniture", 
      quantity: 8, 
      threshold: 3, 
      description: "Ergonomic office chair", 
      lastUpdated: new Date(Date.now() - 86400000).toISOString() 
    },
    { 
      id: 3, 
      name: "Notebooks", 
      category: "Office Supplies", 
      quantity: 3, 
      threshold: 10, 
      description: "Pack of 5 notebooks", 
      lastUpdated: new Date().toISOString() 
    }
  ];

  transactions: Transaction[] = [
    { 
      id: 1, 
      date: new Date().toISOString(), 
      itemId: 1, 
      itemName: "Laptop", 
      type: "add", 
      quantity: 5, 
      user: "John Doe", 
      reason: "New stock received" 
    },
    { 
      id: 2, 
      date: new Date().toISOString(), 
      itemId: 3, 
      itemName: "Notebooks", 
      type: "remove", 
      quantity: 2, 
      user: "Jane Smith", 
      reason: "Office use" 
    },
    { 
      id: 3, 
      date: new Date(Date.now() - 86400000).toISOString(), 
      itemId: 2, 
      itemName: "Desk Chair", 
      type: "add", 
      quantity: 3, 
      user: "John Doe", 
      reason: "New stock received" 
    }
  ];

  // Stats
  totalItems = 0;
  inStockItems = 0;
  lowStockItems = 0;
  todaysTransactions = 0;

  // UI State
  isFilteringLowStock = false;
  displayedColumns = ['id', 'name', 'category', 'quantity', 'lastUpdated', 'actions'];
  transactionColumns = ['date', 'itemName', 'type', 'quantity', 'user'];
  filteredItems: InventoryItem[] = [];
  sortedTransactions: Transaction[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.filteredItems = [...this.inventoryItems];
    this.sortedTransactions = [...this.transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.updateStats();
  }

  private checkAuthentication(): void {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!authToken || userRole !== 'user') {
      this.clearSessionData();
      this.router.navigate(['/user-dashboard']);
    }
  }

  private clearSessionData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    sessionStorage.clear();
  }

  updateStats(): void {
    this.totalItems = this.inventoryItems.length;
    this.inStockItems = this.inventoryItems.filter(item => item.quantity > 0).length;
    this.lowStockItems = this.inventoryItems.filter(item => item.quantity <= item.threshold).length;
    const today = new Date().toISOString().split('T')[0];
    this.todaysTransactions = this.transactions.filter(transaction => 
      transaction.date.startsWith(today)
    ).length;
  }

  toggleLowStockFilter(): void {
    this.isFilteringLowStock = !this.isFilteringLowStock;
    this.filteredItems = this.isFilteringLowStock
      ? this.inventoryItems.filter(item => item.quantity <= item.threshold)
      : [...this.inventoryItems];
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'medium') || '';
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add new item logic
        this.inventoryItems.push(result);
        this.updateStats();
        this.toggleLowStockFilter(); // Refresh filter
      }
    });
  }

  openAdjustStockDialog(item: InventoryItem): void {
    const dialogRef = this.dialog.open(AdjustStockDialogComponent, {
      width: '400px',
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update item quantity logic
        const index = this.inventoryItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
          this.inventoryItems[index].quantity += result.quantityChange;
          this.inventoryItems[index].lastUpdated = new Date().toISOString();
          this.updateStats();
          this.toggleLowStockFilter(); // Refresh filter
        }
      }
    });
  }

  openEditItemDialog(item: InventoryItem): void {
    // Similar implementation to add dialog but with edit functionality
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryItems = this.inventoryItems.filter(item => item.id !== id);
      this.updateStats();
      this.toggleLowStockFilter(); // Refresh filter
    }
  }

  openReportDialog(): void {
    this.dialog.open(ReportDialogComponent, {
      width: '600px',
      data: { inventory: this.inventoryItems, transactions: this.transactions }
    });
  }

  logout(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent, {
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clearSessionData();
        this.router.navigate(['/login']);
      }
    });
  }

  sortTransactions(sort: Sort): void {
    const data = this.transactions.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTransactions = data;
      return;
    }

    this.sortedTransactions = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date': return compare(new Date(a.date), new Date(b.date), isAsc);
        case 'itemName': return compare(a.itemName, b.itemName, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'quantity': return compare(a.quantity, b.quantity, isAsc);
        case 'user': return compare(a.user, b.user, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: any, b: any, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}