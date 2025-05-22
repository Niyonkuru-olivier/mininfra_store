import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({
    type: 'enum',
    enum: ['Activate', 'Deactivate'],
    default: 'Activate'
  })
  status: string;

  @Column()
  created_at: Date;
}