import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Report1Component } from './report1.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

describe('Report1Component', () => {
  let component: Report1Component;
  let fixture: ComponentFixture<Report1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, MatCheckboxModule, FormsModule],
      declarations: [Report1Component]
    }).compileComponents();

    fixture = TestBed.createComponent(Report1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle select all checkboxes for inventory items', () => {
    component.selectAllInventory = true;
    component.toggleSelectAll('inventory');
    expect(component.selectedInventoryItems.every(item => item)).toBeTrue();
  });

  it('should toggle select all checkboxes for asset items', () => {
    component.selectAllAssets = true;
    component.toggleSelectAll('asset');
    expect(component.selectedAssetItems.every(item => item)).toBeTrue();
  });
});
