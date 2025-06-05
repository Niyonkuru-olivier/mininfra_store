import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-management',
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
    MatInputModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  displayedColumns: string[] = ['name', 'role', 'email', 'password', 'status', 'createdAt', 'actions'];
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  private apiUrl = 'http://localhost:3000/user';

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue) ||
      user.role.toLowerCase().includes(filterValue)
    );
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post(this.apiUrl, result).subscribe(newUser => {
          this.users = [...this.users, newUser];
        });
      }
    });
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
      data: { user, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put(`${this.apiUrl}/${user.id}`, result).subscribe(updatedUser => {
          this.users = this.users.map(u => u.id === user.id ? updatedUser : u);
        });
      }
    });
  }

  toggleStatus(user: any): void {
    this.http.put(`${this.apiUrl}/${user.id}/status`, {}).subscribe((updated: any) => {
      user.status = updated.status;
    });
  }

  updatePassword(user: any): void {
    this.http.put(`${this.apiUrl}/${user.id}/password`, { password: user.password }).subscribe(() => {
      alert(`Password updated for ${user.name}`);
    });
  }
}
