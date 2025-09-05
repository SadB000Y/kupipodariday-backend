import { CreateDateColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { UpdateDateColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  updatedAt: Date;
}