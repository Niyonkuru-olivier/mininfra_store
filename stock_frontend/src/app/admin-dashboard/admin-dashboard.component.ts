import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog/logout-confirmation-dialog.component';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface User {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
  email?: string;
  phone?: string;
  createdAt?: string;
}

interface Activity {
  id: number;
  user: string;
  userInitials: string;
  action: string;
  item: string;
  time: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [
    { id: 1, name: 'John Doe', role: 'Administrator', status: 'Active', email: 'john@example.com', phone: '123456789', createdAt: '2024-03-01' },
    { id: 2, name: 'Jane Smith', role: 'Logistics Manager', status: 'Active', email: 'jane@example.com', phone: '987654321', createdAt: '2024-01-15' },
    { id: 3, name: 'Robert Johnson', role: 'Inventory Clerk', status: 'Inactive', email: 'robert@example.com', phone: '456123789', createdAt: '2023-11-20' }
  ];

  activities: Activity[] = [
    { id: 1, user: 'Jane Smith', userInitials: 'JS', action: 'added new product', item: 'Wireless Headphones', time: '2 minutes ago' },
    { id: 2, user: 'John Doe', userInitials: 'JD', action: 'updated stock for', item: 'Bluetooth Speaker', time: '15 minutes ago' },
    { id: 3, user: 'Robert Johnson', userInitials: 'RJ', action: 'created new user account', item: '', time: '1 hour ago' }
  ];

  analyticsChart?: Chart;
  displayedColumns: string[] = ['name', 'role', 'status', 'actions'];
  selectedPeriod: 'daily' | 'weekly' | 'monthly' = 'daily';

  constructor(private dialog: MatDialog, private router: Router) {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!authToken || userRole !== 'admin') {
      // Clear any existing session data
      this.clearSessionData();
      this.router.navigate(['/admin-dashboard']);
    }
  }

  private clearSessionData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.initializeChart();
  }

  initializeChart(): void {
    const ctx = document.getElementById('analyticsChart') as HTMLCanvasElement;
    if (ctx) {
      this.analyticsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'User Activities',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: '#4361ee',
              borderWidth: 1
            },
            {
              label: 'Stock Updates',
              data: [8, 15, 5, 10, 7, 12],
              backgroundColor: '#4cc9f0',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newUser: User = {
          id: this.users.length + 1,
          name: result.name,
          role: result.role,
          status: 'Active',
          email: result.email,
          phone: result.phone,
          createdAt: new Date().toISOString().split('T')[0]
        };
        this.users = [...this.users, newUser];
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
      data: { user, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users = this.users.map(u => u.id === user.id ? { ...u, ...result } : u);
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.id !== userId);
    }
  }

  setAnalyticsPeriod(period: 'daily' | 'weekly' | 'monthly'): void {
    this.selectedPeriod = period;
    // TODO: update chart with dynamic data based on selectedPeriod
  }

  downloadReport(type: 'inventory' | 'assets' | 'users'): void {
    const date = new Date().toISOString().split('T')[0];
    alert(`Downloading ${type} report filtered by Date: ${date}...`);
    // Replace with actual export logic (e.g., service or file-saver)
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
}