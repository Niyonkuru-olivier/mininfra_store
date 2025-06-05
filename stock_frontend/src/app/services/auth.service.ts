import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Check if user is already authenticated
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    // Clear all stored data
    localStorage.removeItem('token');
    sessionStorage.clear();
    
    // Reset authentication state
    this.isAuthenticatedSubject.next(false);
    
    // Clear browser history and prevent back navigation
    window.history.pushState(null, '', '/login');
    window.addEventListener('popstate', this.preventBackNavigation);
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  private preventBackNavigation = (event: PopStateEvent) => {
    // Prevent the default back navigation
    event.preventDefault();
    
    // If user tries to go back, push the login page state again
    window.history.pushState(null, '', '/login');
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
} 