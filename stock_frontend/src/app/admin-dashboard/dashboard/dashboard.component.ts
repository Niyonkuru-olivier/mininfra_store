// dashboard.component.ts
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

import { AddItemDialogComponent } from '../user-dashboard/add-item-dialog/add-item-dialog.component';
import { AdjustStockDialogComponent } from '../user-dashboard/adjust-stock-dialog/adjust-stock-dialog.component';
import { ReportDialogComponent } from '../user-dashboard/report-dialog/report-dialog.component';

@Component({
  selector: 'app-dashboard-overview',
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardOverviewComponent implements OnInit {
  totalUsers = 0;
  totalInventoryItems = 0;
  totalAssetItems = 0;
   lowInventoryStock = 0;
lowAssetStock = 0;
  todaysTransactions = 0;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDashboardStats();
  }

  fetchDashboardStats(): void {
    this.http.get<any>('http://localhost:3000/reports/dashboard-data').subscribe({
      next: data => {
        this.totalUsers = data.totalUsers ?? 0;
        this.totalInventoryItems = data.totalInventoryItems ?? 0;
        this.totalAssetItems = data.totalAssetItems ?? 0;
          this.lowInventoryStock = data.lowInventoryStock ?? 0;
        this.lowAssetStock = data.lowAssetStock ?? 0;
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
        this.fetchDashboardStats();
      }
    });
  }

  openAdjustStockDialog(): void {
    const dialogRef = this.dialog.open(AdjustStockDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchDashboardStats();
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
