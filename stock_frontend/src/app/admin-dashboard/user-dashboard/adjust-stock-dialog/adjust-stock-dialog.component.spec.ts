import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustStockDialogComponent } from './adjust-stock-dialog.component';

describe('AdjustStockDialogComponent', () => {
  let component: AdjustStockDialogComponent;
  let fixture: ComponentFixture<AdjustStockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustStockDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
