import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InventoryComponent } from './inventory.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        FormsModule,
        BrowserAnimationsModule,
        InventoryComponent // Since it's standalone
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load inventory on init', () => {
    spyOn(component, 'loadInventory');
    component.ngOnInit();
    expect(component.loadInventory).toHaveBeenCalled();
  });

  it('should filter inventory based on searchQuery', () => {
    component.inventory = [
      {
        id: 1,
        number: 'INV001',
        name: 'Chair',
        description: 'Wooden chair',
        
        condition: 'Good' as 'Good',
        qtyIn: 10,
        qtyOut: 2,
        balanceQty: 8,
        unitPrice: 50,
        totalPrice: 500
      },
      {
        id: 2,
        number: 'INV002',
        name: 'Table',
        description: 'Metal table',
        
        condition: 'Fair' as 'Fair',
        qtyIn: 5,
        qtyOut: 1,
        balanceQty: 4,
        unitPrice: 100,
        totalPrice: 500
      }
    ];
    component.searchQuery = 'chair';
    component.filterInventory();
    expect(component.filteredInventory.length).toBe(1);
    expect(component.filteredInventory[0].name).toBe('Chair');
  });

  it('should modify inventory quantity by adding stock', () => {
    spyOn(component as any, 'modifyProductQuantity');
    const mockItem = {
      id: 1,
      number: 'INV001',
      name: 'Chair',
      description: 'Wooden chair',
      sku: 'CH001',
      condition: 'Very Good' as 'Very Good',
      qtyIn: 10,
      qtyOut: 2,
      balanceQty: 8,
      unitPrice: 50,
      totalPrice: 500
    };
    component.addStock(mockItem);
    expect((component as any).modifyProductQuantity).toHaveBeenCalledWith(mockItem, 'add');
  });

  it('should modify inventory quantity by removing stock', () => {
    spyOn(component as any, 'modifyProductQuantity');
    const mockItem = {
      id: 1,
      number: 'INV001',
      name: 'Chair',
      description: 'Wooden chair',
      sku: 'CH001',
      condition: 'Very Good' as 'Very Good',
      qtyIn: 10,
      qtyOut: 2,
      balanceQty: 8,
      unitPrice: 50,
      totalPrice: 500
    };
    component.removeStock(mockItem);
    expect((component as any).modifyProductQuantity).toHaveBeenCalledWith(mockItem, 'remove');
  });
});
