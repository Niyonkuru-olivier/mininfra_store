// reports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';
import { Asset } from '../asset/asset.entity';
import { Transaction } from '../transactions/transactions.entity';
import { ReportFilterDto } from './dto/report-filter.dto';

import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepo: Repository<Inventory>,
    @InjectRepository(Asset)
    private assetRepo: Repository<Asset>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  async generateReport(dto: ReportFilterDto, category: 'inventory' | 'asset'): Promise<string> {
    const reportsDir = path.join(__dirname, '..', '..', 'reports');
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

    const isInventory = category === 'inventory';
    let data;

    if (dto.items?.length) {
      data = isInventory
        ? await this.inventoryRepo
            .createQueryBuilder('inventory')
            .where('inventory.name IN (:...names)', { names: dto.items })
            .getMany()
        : await this.assetRepo
            .createQueryBuilder('asset')
            .where('asset.name IN (:...names)', { names: dto.items })
            .getMany();
    } else {
      data = isInventory ? await this.inventoryRepo.find() : await this.assetRepo.find();
    }

    if (!data.length) throw new Error('No items found for the report');

    const rows = data.map((item, i) => {
      const qtyIn = isInventory ? item.qtyIn : item.qty_in;
      const qtyOut = isInventory ? item.qtyOut : item.qty_out;
      const balance = isInventory ? item.balanceQty : item.balance_qty;
      const unitPrice = isInventory ? item.unitPrice : item.unit_price;
      const totalPrice = unitPrice * balance;

      return [
        i + 1,
        item.name,
        item.description,
        qtyIn,
        qtyOut,
        balance,
        unitPrice,
        totalPrice
      ];
    });

    const grandTotal = rows.reduce((sum, row) => sum + Number(row[7]), 0);

    const fileExt = dto.format === 'pdf' ? 'pdf' : dto.format === 'xlsx' ? 'xlsx' : 'csv';
    const filename = `${category}-report-${Date.now()}.${fileExt}`;
    const filePath = path.join(reportsDir, filename);

    const headers = ['No', 'Name', 'Description', 'Qty In', 'Qty Out', 'Balance Qty', 'Unit Price(RWF)', 'Total Price(RWF)'];

    if (dto.format === 'pdf') {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.fontSize(16).text('Republic of Rwanda');
      doc.image(path.resolve('src', 'asset', 'logo.png'), 50, doc.y + 10, { width: 80 });
      doc.moveDown(6);

      doc.fontSize(12).text('MINISTRY OF INFRASTRUCTURE');
      doc.fontSize(11).text('P.O.BOX 24 KIGALI', { underline: true });
      doc.fontSize(8).text('E-mail: info@mininfra.gov.rw');

      const currentDate = new Date().toLocaleDateString();
      doc.moveDown(2);
      doc.fontSize(13).text(`${category.toUpperCase()} REPORT AS AT ${currentDate}`, {
        align: 'center',
        underline: true,
      });
      doc.moveDown(2);

      const colWidths = [30, 80, 100, 50, 50, 60, 60, 60];
      const startX = 50;
      let y = doc.y;
      const rowHeight = 30;

      doc.font('Helvetica-Bold').fontSize(10);
      headers.forEach((header, i) => {
        const x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
        doc.text(header, x + 2, y + 5, { width: colWidths[i] - 4, align: 'left' });
        doc.rect(x, y, colWidths[i], rowHeight).stroke();
      });

      y += rowHeight;
      doc.font('Helvetica').fontSize(9);
      rows.forEach(row => {
        row.forEach((cell, i) => {
          const x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
          doc.text(String(cell), x + 2, y + 5, { width: colWidths[i] - 4, align: 'left' });
          doc.rect(x, y, colWidths[i], rowHeight).stroke();
        });
        y += rowHeight;
        if (y + rowHeight > doc.page.height - 50) {
          doc.addPage();
          y = 50;
        }
      });

      // Grand total line
      y += 10;
      doc.font('Helvetica-Bold').fontSize(10);
      doc.text(`Grand Total: ${grandTotal.toFixed(2)} RWF`, startX, y);

      // Footer signatories
      doc.moveDown(6);
      const indent = 50;
      const sigLine = '____________________';
      doc.font('Helvetica-Bold').text('Prepared by:', indent);
      doc.font('Helvetica').text(`Celestin Safari          ${sigLine}`);
      doc.text('Logistics Officer');
      doc.moveDown();
      doc.font('Helvetica-Bold').text('Checked by:', indent);
      doc.font('Helvetica').text(`Martin Munyaneza         ${sigLine}`);
      doc.text('Financial Management Specialist');
      doc.moveDown();
      doc.font('Helvetica-Bold').text('Approved by:', indent);
      doc.font('Helvetica').text(`Marie Chantal Zaninka    ${sigLine}`);
      doc.text('DG/Corporate Services');
      doc.moveDown();
      doc.font('Helvetica-Bold').text('Verified by:', indent);
      doc.font('Helvetica').text(`Javan Gatoya             ${sigLine}`);
      doc.text('Chairperson/Logistic Committee');
      doc.text(`Daniel Kamanzi           ${sigLine}`);
      doc.text('Member Logistic Committee');

      doc.end();
      await new Promise<void>((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });
    } else {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet(`${category} Report`);

      sheet.addRow([`${category.toUpperCase()} REPORT`]);
      sheet.mergeCells('A1:H1');
      sheet.getCell('A1').font = { size: 16, bold: true };
      sheet.addRow([]);

      sheet.addRow(headers).eachCell(cell => {
        cell.font = { bold: true };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEEEEEE' } };
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      rows.forEach(row => {
        sheet.addRow(row);
      });

      sheet.addRow([]);
      sheet.addRow(['', '', '', '', '', '', 'Grand Total:', grandTotal]);

      sheet.columns.forEach(col => (col.width = 15));
      await workbook.xlsx.writeFile(filePath);
    }

    return filePath;
  }

  async getDashboardData(): Promise<any> {
    const inventory = await this.inventoryRepo.find();
    const assets = await this.assetRepo.find();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const transactions = await this.transactionRepo.find({
      where: { date: Between(today, tomorrow) },
    });

    const lowInventoryStock = inventory.filter(item => item.balanceQty <= item.threshold).length;
    const lowAssetStock = assets.filter(item => item.balance_qty <= item.threshold).length;

    return {
      totalInventoryItems: inventory.length,
      totalAssetItems: assets.length,
      lowInventoryStock,
      lowAssetStock,
      todaysTransactions: transactions.length,
    };
  }
// Inside ReportsService
async getInventoryItems() {
  const items = await this.inventoryRepo.find();
  return items.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    qtyIn: item.qtyIn,
    qtyOut: item.qtyOut,
    balanceQty: item.balanceQty,
    unitPrice: item.unitPrice,
    totalPrice: item.totalPrice,
  }));
}

async getAssetItems() {
  const items = await this.assetRepo.find();
  return items.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    sku: item.sku,
    qty_in: item.qty_in,
    qty_out: item.qty_out,
    balance_qty: item.balance_qty,
    unit_price: item.unit_price,
    total_price: item.total_price,
  }));
}



}
