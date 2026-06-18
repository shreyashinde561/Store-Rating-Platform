import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Rating } from '../ratings/rating.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Temporarily nullable because old stores already exist
  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column()
  address: string;

  @Column()
  description: string;

  @OneToMany(
    () => Rating,
    (rating) => rating.store,
  )
  ratings: Rating[];
}
