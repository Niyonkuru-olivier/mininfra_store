import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email: string = ''; // Pre-filled from query params
  resetToken: string = ''; // Pre-filled from query params
  newPassword: string = '';
  confirmPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pre-fill email and reset token from query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.resetToken = params['token'] || '';
      
      // Validate that we have both email and token
      if (!this.email || !this.resetToken) {
        this.errorMessage = 'Invalid or expired reset link. Please request a new password reset.';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      }
    });
  }

  submitReset(): void {
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const payload = {
      email: this.email, // Use pre-filled email
      token: this.resetToken, // Use pre-filled reset token
      newPassword: this.newPassword,
    };

    this.http.post<{ message: string }>(`${environment.apiUrl}/auth/reset-password`, payload)
      .subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/appreciate']), 2000); // Redirect to login after 2s
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Reset failed.';
          this.successMessage = '';
        }
      });
  }
}