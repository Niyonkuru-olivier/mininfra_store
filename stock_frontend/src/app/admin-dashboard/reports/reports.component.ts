// reports.component.ts
import { Component, OnInit, ViewChild, Inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface ReportData {
  items: string[];
  type: string;
  format: string;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [ReportsService, HttpClient]
})
export class ReportsComponent implements OnInit, AfterViewInit {
  filters: { startDate: Date; endDate: Date } = { startDate: new Date(), endDate: new Date() };
  filteredUsers: any[] = [];
  displayedColumns: string[] = [
    'select',
    'name',
    'description',
    'sku',
    'qtyIn',
    'qtyOut',
    'balance',
    'unitPrice',
    'totalPrice'
  ];

  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  dateRange: FormGroup;
  selectedReportType: 'inventory' | 'asset' = 'inventory';
  selectedFormat: 'pdf' | 'xlsx' | 'csv' = 'pdf';
  formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'xlsx', label: 'Excel' },
    { value: 'csv', label: 'CSV' }
  ];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    @Inject(ReportsService) private reportsService: ReportsService,
    private cdr: ChangeDetectorRef
  ) {
    this.dateRange = this.fb.group({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null)
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.initializeSort();
    this.cdr.detectChanges();
  }

  private initializeSort() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  private updateDataSource(items: any[]) {
    this.dataSource = new MatTableDataSource(items);
    this.initializeSort();
    this.cdr.detectChanges();
  }

  loadData() {
    if (this.selectedReportType === 'inventory') {
      this.reportsService.getInventoryItems().subscribe(items => {
        this.updateDataSource(items);
      });
    } else {
      this.reportsService.getAssetItems().subscribe(items => {
        this.updateDataSource(items);
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  clearSelection() {
    this.selection.clear();
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

  generateReport() {
    if (!this.dateRange.get('start')?.value || !this.dateRange.get('end')?.value) {
      alert('Please select both start and end dates');
      return;
    }

    const selectedItems = this.selection.selected.map(item => item.name);
    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    const reportData: ReportData = {
      items: selectedItems,
      type: this.selectedReportType,
      format: this.selectedFormat,
      startDate: this.dateRange.get('start')?.value,
      endDate: this.dateRange.get('end')?.value
    };

    const generateReport = (response: Blob) => {
      const mimeType = this.getMimeType(this.selectedFormat);
      const blob = new Blob([response], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${this.selectedReportType}-report.${this.selectedFormat}`;
      link.click();
      window.URL.revokeObjectURL(url);
    };

    if (this.selectedReportType === 'inventory') {
      this.reportsService.generateInventoryReport(reportData).subscribe(
        response => generateReport(response),
        error => {
          console.error('Error generating report:', error);
          alert('Error generating report. Please try again.');
        }
      );
    } else {
      this.reportsService.generateAssetReport(reportData).subscribe(
        response => generateReport(response),
        error => {
          console.error('Error generating report:', error);
          alert('Error generating report. Please try again.');
        }
      );
    }
  }

  exportAsCSV(): void {
    const rows = [
      ['Name', 'Email', 'Phone', 'Created At', 'Password'],
      ...this.dataSource.data.map(u => [u.name, u.email, u.phone, u.createdAt, u.password])
    ];
    const csvContent = rows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportAsPDF(): void {
    import('jspdf').then((module) => {
      const doc = new module.default(); // Correctly instantiate jsPDF
      doc.text('User Report', 10, 10);
      const rows = this.dataSource.data.map(user => [user.name, user.email, user.phone, user.createdAt, user.password]);
      (doc as any).autoTable({
        head: [['Name', 'Email', 'Phone', 'Created At', 'Password']],
        body: rows,
        startY: 20
      });
      doc.save('user_report.pdf');
    });
  }
  exportAsExcel(): void {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.dataSource.data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user_report.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
