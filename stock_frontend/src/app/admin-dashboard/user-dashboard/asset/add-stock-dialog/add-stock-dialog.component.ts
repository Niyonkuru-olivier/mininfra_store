import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-stock-dialog',
  standalone: true,
  templateUrl: './add-stock-dialog.component.html',
  styleUrls: ['./add-stock-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class AddStockDialogComponent {
  quantity: number = 0;
  showError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      action: 'add' | 'remove',
      item: {
        balance_qty: number;
        unit_price: number;
      }
    }
  ) {}

  validateQuantity(): void {
    if (this.data.action === 'remove' && this.quantity > this.data.item.balance_qty) {
      this.showError = true;
    } else {
      this.showError = false;
    }
  }

  get totalPrice(): number {
    return this.data.item.balance_qty * this.data.item.unit_price;
  }

  get totalQuantity(): number {
    const change = this.data.action === 'add' ? this.quantity : -this.quantity;
    return this.data.item.balance_qty + change;
  }

  confirm(): void {
    if (this.showError) return;
    this.dialogRef.close(this.quantity);
  }
}
