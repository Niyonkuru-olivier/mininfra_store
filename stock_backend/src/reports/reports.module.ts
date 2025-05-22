import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Transaction } from '../transactions/transactions.entity';
import { Inventory } from '../inventory/inventory.entity';
import { Asset } from '../asset/asset.entity';
import { InventoryModule } from '../inventory/inventory.module';
import { AssetModule } from '../asset/asset.module';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory, Asset, Transaction]),
    InventoryModule,
    AssetModule,
    TransactionsModule
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
