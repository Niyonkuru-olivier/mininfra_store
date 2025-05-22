import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AppreciateComponent } from './appreciate/appreciate.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardOverviewComponent } from './admin-dashboard/dashboard/dashboard.component';
import { UserDashboardComponent } from './admin-dashboard/user-dashboard/user-dashboard.component';
import { InventoryManagementComponent } from './admin-dashboard/inventory-management/inventory-management.component';
import { AssetManagementComponent } from './admin-dashboard/asset-management/asset-management.component';
import { ReportsComponent } from './admin-dashboard/reports/reports.component';
import { UserManagementComponent } from './admin-dashboard/user-management/user-management.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'appreciate', component: AppreciateComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardOverviewComponent },
      { path: 'user-dashboard', component: UserDashboardComponent },
      { path: 'inventory-management', component: InventoryManagementComponent },
      { path: 'asset-management', component: AssetManagementComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  },
  { path: '**', redirectTo: '' } // Ensure this is the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}