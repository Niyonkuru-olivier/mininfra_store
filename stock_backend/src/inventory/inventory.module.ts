import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TransactionsModule } from '../transactions/transactions.module'; // 👈 Import this

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]),
  TransactionsModule,
],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
