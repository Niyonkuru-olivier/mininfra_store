import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Make sure this is added if you're using standalone structure
  
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  title = 'Inventory System';

  constructor(private router: Router) {}

  navigateToLogin(): void {
    alert('Login button clicked!');
    this.router.navigate(['/login']);
  }

  navigateToCreateAccount(): void {
    const confirmed = alert('Redirecting to Create Account page...');
    // ⚠️ Alert is blocking, so navigation will happen after user clicks OK
    this.router.navigate(['/create-account']);
  }
}
