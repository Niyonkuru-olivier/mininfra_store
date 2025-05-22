import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css'],
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
export class AddItemDialogComponent implements OnInit {
  item = {
    name: '',
    description: '',
    //sku: '',
    condition: 'Good',
    qtyIn: 0,
    qtyOut: 0, // Default qtyOut
    unitPrice: 0,
    totalPrice: 0, // Calculated field - will be computed on the backend
    threshold: 5, // Default threshold
  };

  isEditing = false;
  conditions = ['Fair', 'Good', 'Very Good'];

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data?.item) {
      this.item = { ...this.data.item };
      this.isEditing = true;
    }
  }

  onSave(): void {
    if (this.item.name /*&& this.item.sku*/ && this.item.qtyIn >= 0 && this.item.unitPrice >= 0) {
      this.dialogRef.close(this.item);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
