import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionType } from '../transactions/transactions.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
    private readonly transactionsService: TransactionsService,
  ) {}

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepo.find();
  }

  async findOne(id: number): Promise<Inventory> {
    const item = await this.inventoryRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return item;
  }

  async create(dto: CreateInventoryDto, userEmail: string): Promise<Inventory> {
    const lastItem = await this.inventoryRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });

    const newItem = this.inventoryRepo.create({
      ...dto,
      qtyOut: 0,
      balanceQty: dto.qtyIn,
      number: `INV00${(lastItem?.id || 0) + 1}`,
      totalPrice: dto.qtyIn * dto.unitPrice,
    });

    const saved = await this.inventoryRepo.save(newItem);

    await this.transactionsService.createTransaction({
      itemId: saved.id,
      itemName: saved.name,
      type: TransactionType.ADD,
      quantity: saved.qtyIn,
      user: userEmail,
      reason: 'Inventory created',
    });

    return saved;
  }

  async update(id: number, dto: UpdateInventoryDto, userEmail: string): Promise<Inventory> {
    const existing = await this.findOne(id);

    const updated = {
      ...existing,
      ...dto,
      balanceQty:
        dto.qtyIn !== undefined
          ? dto.qtyIn - (dto.qtyOut ?? existing.qtyOut)
          : existing.balanceQty,
      totalPrice:
        (dto.qtyIn ?? existing.qtyIn) * (dto.unitPrice ?? existing.unitPrice),
    };

    const saved = await this.inventoryRepo.save(updated);

    await this.transactionsService.createTransaction({
      itemId: saved.id,
      itemName: saved.name,
      type: TransactionType.UPDATE,
      quantity: saved.qtyIn,
      user: userEmail,
      reason: 'Inventory updated',
    });

    return saved;
  }

  async remove(id: number, userEmail: string): Promise<void> {
    const existing = await this.findOne(id);

    await this.transactionsService.createTransaction({
      itemId: existing.id,
      itemName: existing.name,
      type: TransactionType.REMOVE,
      quantity: existing.qtyIn,
      user: userEmail,
      reason: 'Inventory removed',
    });

    await this.inventoryRepo.delete(id);
  }
}
