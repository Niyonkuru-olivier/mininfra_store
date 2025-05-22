import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { appConfig } from './app/app.config';
import { WelcomeComponent } from './app/welcome/welcome.component';
import { LoginComponent } from './app/login/login.component';
import { AppreciateComponent } from './app/appreciate/appreciate.component';
import { provideHttpClient } from '@angular/common/http';
import { AdminDashboardComponent } from './app/admin-dashboard/admin-dashboard.component';
import { DashboardOverviewComponent } from './app/admin-dashboard/dashboard/dashboard.component';
import { UserDashboardComponent } from './app/admin-dashboard/user-dashboard/user-dashboard.component';
import { InventoryManagementComponent } from './app/admin-dashboard/inventory-management/inventory-management.component';
import { AssetManagementComponent } from './app/admin-dashboard/asset-management/asset-management.component';
import { AssetComponent } from './app/admin-dashboard/user-dashboard/asset/asset.component';
import { InventoryComponent } from './app/admin-dashboard/user-dashboard/inventory/inventory.component';
import { UserDashboardComponent as Dashboard1Component } from './app/admin-dashboard/user-dashboard/dashboard1/dashboard1.component';
import { Report1Component } from './app/admin-dashboard/user-dashboard/report1/report1.component';
//import { ReportsComponent } from './app/admin-dashboard/reports/reports.component';
import { ResetPasswordComponent } from './app/admin-dashboard/reset-password/reset-password.component';
import { UserManagementComponent } from './app/admin-dashboard/user-management/user-management.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'appreciate', component: AppreciateComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
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
          //{ path: 'reports', component: ReportsComponent }
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