import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppreciateComponent } from './appreciate.component';

describe('AppreciateComponent', () => {
  let component: AppreciateComponent;
  let fixture: ComponentFixture<AppreciateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppreciateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppreciateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
