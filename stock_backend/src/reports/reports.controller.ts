import { Controller, Post, Get, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { ReportFilterDto } from './dto/report-filter.dto';
import { InventoryReportDto } from './dto/inventory-report.dto';
import { AssetReportDto } from './dto/asset-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('inventory')
  async generateInventoryReport(@Body() dto: ReportFilterDto, @Res() res: Response) {
    const filePath = await this.reportsService.generateReport(dto, 'inventory');
    res.download(filePath);
  }

  @Post('assets')
  async generateAssetReport(@Body() dto: ReportFilterDto, @Res() res: Response) {
    const filePath = await this.reportsService.generateReport(dto, 'asset');
    res.download(filePath);
  }

  @Get('inventory-items')
  async getInventoryItems() {
    return await this.reportsService.getInventoryItems();
  }

  @Get('asset-items')
  async getAssetItems() {
    return await this.reportsService.getAssetItems();
  }

  @Get('dashboard-data')
  async getDashboardData() {
    return this.reportsService.getDashboardData();
  }
}
