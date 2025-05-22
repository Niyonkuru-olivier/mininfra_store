import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class AddItemDialogComponent {
  quantity: number = 0;
  showError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      action: 'add' | 'remove',
      item: {
        balanceQty: number;
        unitPrice: number;
      }
    }
  ) {}

  // Prevent exceeding available stock
  validateQuantity(): void {
    if (this.data.action === 'remove' && this.quantity > this.data.item.balanceQty) {
      this.showError = true;
    } else {
      this.showError = false;
    }
  }

  // Keep current balance in totalPrice (not the projected total)
  get totalPrice(): number {
    return this.data.item.balanceQty * this.data.item.unitPrice;
  }

  get totalQuantity(): number {
    const change = this.data.action === 'add' ? this.quantity : -this.quantity;
    return this.data.item.balanceQty + change;
  }

  confirm(): void {
    if (this.showError) return;
    this.dialogRef.close(this.quantity);
  }
}
