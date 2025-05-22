import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
import { MatSortModule } from '@angular/material/sort';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { AdjustStockDialogComponent } from '../adjust-stock-dialog/adjust-stock-dialog.component';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    DatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
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
    MatSortModule,
    AddItemDialogComponent,
    AdjustStockDialogComponent,
    ReportDialogComponent
  ]
})
export class UserDashboardComponent implements OnInit {
  totalInventoryItems = 0;
  totalAssetItems = 0;
  
  lowInventoryStock = 0;
lowAssetStock = 0;
  todaysTransactions = 0;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getDashboardStats();
  }

  getDashboardStats(): void {
    this.http.get<any>('http://localhost:3000/reports/dashboard-data').subscribe({
      next: data => {
        this.totalInventoryItems = data.totalInventoryItems ?? 0;
        this.totalAssetItems = data.totalAssetItems ?? 0;
        this.lowAssetStock = data.lowAssetStock ?? 0;
        this.lowInventoryStock= data.lowInventoryStock ?? 0;
        this.todaysTransactions = data.todaysTransactions ?? 0;
      },
      error: err => {
        console.error('Failed to load dashboard stats:', err);
      }
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh dashboard stats after adding new item
        this.getDashboardStats();
      }
    });
  }

  openAdjustStockDialog(): void {
    const dialogRef = this.dialog.open(AdjustStockDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh dashboard stats after adjusting stock
        this.getDashboardStats();
      }
    });
  }

  openReportDialog(): void {
    this.dialog.open(ReportDialogComponent, {
      width: '600px'
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
