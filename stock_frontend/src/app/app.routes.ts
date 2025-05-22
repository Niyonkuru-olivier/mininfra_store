import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './admin-dashboard/user-dashboard/user-dashboard.component';
import { ResetPasswordComponent } from './admin-dashboard/reset-password/reset-password.component';
export const routes: Routes = [
    { path: 'admin', component: AdminDashboardComponent },
    { path: 'user', component: UserDashboardComponent },
    { path: 'reset-password', component: ResetPasswordComponent }
  // Add other routes as needed
];
