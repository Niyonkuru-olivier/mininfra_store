// dashboard.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOverviewComponent } from './dashboard.component';

describe('DashboardOverviewComponent', () => {
  let component: DashboardOverviewComponent;
  let fixture: ComponentFixture<DashboardOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOverviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch simulated dashboard stats', () => {
    expect(component.totalUsers).toBe(0);
    expect(component.totalInventoryItems).toBe(0);
    expect(component.totalAssetItems).toBe(0);
    expect(component.lowInventoryStock).toBe(0);
    expect(component.lowAssetStock).toBe(0);
    expect(component.todaysTransactions).toBe(0);

  });
});
