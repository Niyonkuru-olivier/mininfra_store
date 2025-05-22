import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  getInventoryItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventory-items`);
  }

  getAssetItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asset-items`);
  }

  generateInventoryReport(data: {
    items: string[],
    type: string,
    format: string,
    startDate: Date,
    endDate: Date
  }): Observable<Blob> {
    const payload = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString()
    };
    return this.http.post(`${this.apiUrl}/inventory`, payload, {
      responseType: 'blob',
      headers: {
        'Accept': this.getAcceptHeader(data.format)
      }
    });
  }

  generateAssetReport(data: {
    items: string[],
    type: string,
    format: string,
    startDate: Date,
    endDate: Date
  }): Observable<Blob> {
    const payload = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString()
    };
    return this.http.post(`${this.apiUrl}/assets`, payload, {
      responseType: 'blob',
      headers: {
        'Accept': this.getAcceptHeader(data.format)
      }
    });
  }

  private getAcceptHeader(format: string): string {
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
} 