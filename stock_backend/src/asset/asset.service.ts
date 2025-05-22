import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionType } from '../transactions/transactions.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
    private readonly transactionsService: TransactionsService,
  ) {}

  async findAll(): Promise<Asset[]> {
    return this.assetRepo.find();
  }

  async create(createDto: CreateAssetDto, userEmail: string): Promise<Asset> {
    const number = `AST00${Date.now().toString().slice(-4)}`;

    const asset = this.assetRepo.create({
      ...createDto,
      number,
      qty_out: 0,
    });

    const saved = await this.assetRepo.save(asset);

    await this.transactionsService.createTransaction({
      itemId: saved.id,
      itemName: saved.name,
      type: TransactionType.ADD,
      quantity: saved.qty_in,
      user: userEmail,
      reason: 'Asset added',
    });

    return saved;
  }

  async update(id: number, updateDto: UpdateAssetDto, userEmail: string): Promise<Asset> {
    const asset = await this.assetRepo.findOneBy({ id });
    if (!asset) throw new NotFoundException('Asset not found');

    const updated = {
      ...asset,
      ...updateDto,
    };

    const saved = await this.assetRepo.save(updated);

    await this.transactionsService.createTransaction({
      itemId: saved.id,
      itemName: saved.name,
      type: TransactionType.UPDATE,
      quantity: saved.qty_in,
      user: userEmail,
      reason: 'Asset updated',
    });

    return saved;
  }
}
