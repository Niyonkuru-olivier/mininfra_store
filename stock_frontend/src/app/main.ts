import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { appConfig } from './app.config';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { AppreciateComponent } from './appreciate/appreciate.component';
import { provideHttpClient } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardOverviewComponent } from './admin-dashboard/dashboard/dashboard.component';
import { UserDashboardComponent } from './admin-dashboard/user-dashboard/user-dashboard.component';
import { InventoryManagementComponent } from './admin-dashboard/inventory-management/inventory-management.component';
import { AssetManagementComponent } from './admin-dashboard/asset-management/asset-management.component';
import { AssetComponent } from './admin-dashboard/user-dashboard/asset/asset.component';
import { InventoryComponent } from './admin-dashboard/user-dashboard/inventory/inventory.component';
import { UserDashboardComponent as Dashboard1Component } from './admin-dashboard/user-dashboard/dashboard1/dashboard1.component';
import { Report1Component } from './admin-dashboard/user-dashboard/report1/report1.component';
import { ReportsComponent } from './admin-dashboard/reports/reports.component';
import { ResetPasswordComponent } from './admin-dashboard/reset-password/reset-password.component';
import { UserManagementComponent } from './admin-dashboard/user-management/user-management.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'appreciate', component: AppreciateComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardOverviewComponent },
          {
            path: 'user-dashboard',
            component: UserDashboardComponent,
            children: [
              { path: '', redirectTo: 'dashboard1', pathMatch: 'full' },
              { path: 'dashboard1', component: Dashboard1Component },
              { path: 'inventory', component: InventoryComponent },
              { path: 'asset', component: AssetComponent },
              { path: 'report1', component: Report1Component },
            ],
          },
          { path: 'inventory-management', component: InventoryManagementComponent },
          { path: 'asset-management', component: AssetManagementComponent },
          { path: 'user-management', component: UserManagementComponent },
          { path: 'reports', component: ReportsComponent }
        ],
      },
      {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        children: [
          { path: '', redirectTo: 'dashboard1', pathMatch: 'full' },
          { path: 'dashboard1', component: Dashboard1Component },
          { path: 'inventory', component: InventoryComponent },
          { path: 'asset', component: AssetComponent },
          { path: 'report1', component: Report1Component }
        ],
      },
      { path: '**', redirectTo: '' },
    ]),
    provideHttpClient(),
    ...appConfig.providers,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  ],
}); 