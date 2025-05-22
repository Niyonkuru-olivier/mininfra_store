// src/transactions/transactions.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() data: Partial<Transaction>) {
    return this.transactionsService.createTransaction(data);
  }

  @Get()
  findAll(): Promise<Transaction[]> {
    return this.transactionsService.getAll();
  }

  @Get('/today')
  findToday(): Promise<Transaction[]> {
    return this.transactionsService.getTodayTransactions();
  }
}
