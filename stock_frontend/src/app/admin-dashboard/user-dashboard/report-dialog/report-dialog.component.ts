import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
})
export class ReportDialogComponent implements OnInit {
  report = {
    type: 'daily',
    format: 'pdf',
    startDate: new Date(),
    endDate: new Date(),
  };

  showCustomRange = false;
  items: string[] = [];
  selectedItems: string[] = [];
  selectAll = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: string[], type: string },
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.items = this.data.items || [];
    if (this.items.length === 0) {
      this.snackBar.open('No items selected. Please select items from the previous screen.', 'Close', {
        duration: 5000,
      });
      this.dialogRef.close();
    }
  }

  onTypeChange(): void {
    this.showCustomRange = this.report.type === 'custom';
  }

  toggleSelectAll(): void {
    if (this.selectAll) {
      this.selectedItems = [...this.items];
    } else {
      this.selectedItems = [];
    }
  }

  onItemSelectionChange(): void {
    this.selectAll = this.selectedItems.length === this.items.length;
  }

  toggleItemSelection(item: string): void {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
    this.onItemSelectionChange();
  }

  generateReport(): void {
    if (!this.selectedItems.length) {
      this.snackBar.open('Please select at least one item to generate the report.', 'Close', {
        duration: 5000,
      });
      return;
    }

    const payload = {
      items: this.selectedItems,
      type: this.report.type,
      format: this.report.format,
      startDate: this.report.startDate,
      endDate: this.report.endDate,
    };

    const url = this.data.type === 'Inventory'
      ? 'http://localhost:3000/reports/inventory'
      : 'http://localhost:3000/reports/assets';

    this.http.post(url, payload, { 
      responseType: 'blob',
      headers: {
        'Accept': this.getMimeType(this.report.format)
      }
    }).subscribe({
      next: (blob) => {
        const fileType = this.getMimeType(this.report.format);
        const file = new Blob([blob], { type: fileType });
        const fileExtension = this.getFileExtension(this.report.format);
        saveAs(file, `${this.data.type}-report.${fileExtension}`);

        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error generating report:', error);
        this.snackBar.open('Failed to generate the report. Please try again.', 'Close', {
          duration: 5000,
        });
      }
    });
  }

  private getMimeType(format: string): string {
    switch (format) {
      case 'pdf':
        return 'application/pdf';
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'csv':
        return 'text/csv';
      default:
        return 'application/octet-stream';
    }
  }

  private getFileExtension(format: string): string {
    switch (format) {
      case 'pdf':
        return 'pdf';
      case 'xlsx':
        return 'xlsx';
      case 'csv':
        return 'csv';
      default:
        return 'txt';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
