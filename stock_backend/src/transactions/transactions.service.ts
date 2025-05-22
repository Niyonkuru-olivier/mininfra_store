// src/transactions/transactions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Transaction, TransactionType } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionRepo.create(data);
    return this.transactionRepo.save(transaction);
  }

  async getAll(): Promise<Transaction[]> {
    return this.transactionRepo.find({
      order: { date: 'DESC' },
    });
  }

  async getTodayTransactions(): Promise<Transaction[]> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return this.transactionRepo.find({
      where: { date: Between(start, end) },
      order: { date: 'DESC' },
    });
  }

  async countTodayTransactions(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return this.transactionRepo.count({
      where: { date: Between(start, end) },
    });
  }
}
