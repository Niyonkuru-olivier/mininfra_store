import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TransactionsModule } from '../transactions/transactions.module'; // 👈 Import this

@Module({
  imports: [TypeOrmModule.forFeature([Asset]),
  TransactionsModule,
],
  controllers: [AssetController],
  providers: [AssetService]
})
export class AssetModule {}
