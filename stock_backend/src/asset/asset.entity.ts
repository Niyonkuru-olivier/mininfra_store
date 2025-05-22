import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  sku: string;

  @Column()
  condition: 'Fair' | 'Good' | 'Very Good';

  @Column({ name: 'qty_in', type: 'int' })
  qty_in: number;

  @Column({ name: 'qty_out', type: 'int', default: 0 })
  qty_out: number;

  @Column({
    type: 'int',
    asExpression: 'qty_in - qty_out',
    generatedType: 'STORED',
    insert: false,
    update: false
  })
  balance_qty: number;

  @Column({ 
    name: 'unit_price', 
    type: 'decimal', 
    precision: 10, 
    scale: 2,
    default: 0.00
  })
  unit_price: number;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    asExpression: 'balance_qty * unit_price',
    generatedType: 'STORED',
    insert: false,
    update: false
  })
  readonly total_price: number;

  @Column({ type: 'int', default: 5 }) // 👈 NEW FIELD
  threshold: number;
}
