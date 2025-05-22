import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-adjust-stock-dialog',
  templateUrl: './adjust-stock-dialog.component.html',
  styleUrls: ['./adjust-stock-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class AdjustStockDialogComponent {
  adjustment = {
    type: 'add',
    quantity: 1,
    reason: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AdjustStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    if (this.adjustment.quantity > 0) {
      this.dialogRef.close(this.adjustment);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}