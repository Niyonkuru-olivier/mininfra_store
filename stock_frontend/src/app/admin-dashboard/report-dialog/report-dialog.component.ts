import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  MatDialogModule,
  MatTableModule
]
})

export class ReportDialogComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.dataSource = new MatTableDataSource(data.items);
    this.setDisplayedColumns(data.type);
  }

  ngOnInit(): void {}

  setDisplayedColumns(type: string): void {
    switch (type) {
      case 'inventory':
        this.displayedColumns = ['name', 'quantity', 'minimumQuantity', 'location', 'category'];
        break;
      case 'asset':
        this.displayedColumns = ['name', 'quantity', 'minimumQuantity', 'location', 'category'];
        break;
      case 'transaction':
        this.displayedColumns = ['date', 'type', 'itemName', 'quantity', 'user'];
        break;
      default:
        this.displayedColumns = ['name', 'quantity'];
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
} 