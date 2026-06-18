import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rating } from '../ratings/rating.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;   // NEW

  @Column()
  address: string;

  @Column()
  description: string;

  @OneToMany(() => Rating, (rating) => rating.store)
  ratings: Rating[];
}