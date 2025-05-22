// src/transactions/transaction.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  export enum TransactionType {
    ADD = 'add',
    REMOVE = 'remove',
    UPDATE = 'update',
  }
  
  @Entity()
  export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    date: Date;
  
    @Column()
    itemId: number;
  
    @Column()
    itemName: string;
  
    @Column({
      type: 'enum',
      enum: TransactionType,
    })
    type: TransactionType;
  
    @Column('int')
    quantity: number;
  
    @Column()
    user: string;
  
    @Column({ nullable: true })
    reason: string;
  }
