import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  name: string;

  @Column()
  description: string;

  /*@Column()
  sku: string;*/

  @Column()
  condition: 'Fair' | 'Good' | 'Very Good';

  @Column({ type: 'int' })
  qtyIn: number;

  @Column({ type: 'int' })
  qtyOut: number;

  @Column({ type: 'int' })
  balanceQty: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalPrice: number;
  @Column({ type: 'int', default: 5 }) // 👈 NEW FIELD
  threshold: number;
}
