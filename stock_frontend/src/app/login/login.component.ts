import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  role: string = 'user';
  errorMessage: string = '';
  successMessage: string = '';

  showForgotPassword: boolean = false;
  forgotEmail: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // If user is already authenticated, redirect to dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    // Clear browser history and prevent back navigation
    window.history.pushState(null, '', '/login');
    window.addEventListener('popstate', this.preventBackNavigation);
  }

  ngOnDestroy(): void {
    // Clean up event listener
    window.removeEventListener('popstate', this.preventBackNavigation);
  }

  private preventBackNavigation = (event: PopStateEvent) => {
    // Prevent the default back navigation
    event.preventDefault();
    
    // If user tries to go back, push the login page state again
    window.history.pushState(null, '', '/login');
  }

  onSubmit(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const payload = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post<{ message: string }>(`${environment.apiUrl}/auth/login`, payload)
      .subscribe({
        next: (res) => {
          this.successMessage = res.message || 'Login successful!';
          this.errorMessage = '';
          console.log(`Logged in as ${this.role}`);

          if (this.role === 'admin') {
            this.router.navigate(['/admin-dashboard']).then(success => {
              if (!success) {
                this.errorMessage = 'Navigation to admin-dashboard failed.';
              }
            });
          } else {
            this.router.navigate(['/user-dashboard']).then(success => {
              if (!success) {
                this.errorMessage = 'Navigation to user-dashboard failed.';
              }
            });
          }
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Login failed. Please try again.';
          this.successMessage = '';
        }
      });
  }

  openForgotPassword(): void {
    this.showForgotPassword = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelForgotPassword(): void {
    this.showForgotPassword = false;
    this.forgotEmail = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  submitForgotPassword(): void {
    if (!this.forgotEmail.trim()) {
      this.errorMessage = 'Please enter your registered email.';
      return;
    }

    this.http.post<{ message: string, token?: string }>(`${environment.apiUrl}/auth/forgot-password`, {
      email: this.forgotEmail
    }).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.showForgotPassword = false;
        console.log('Reset Token (for dev):', res.token);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Failed to send reset link.';
        this.successMessage = '';
      }
    });
  }
}
