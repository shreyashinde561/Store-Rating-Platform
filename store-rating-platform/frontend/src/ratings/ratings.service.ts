import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rating } from './rating.entity';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
  ) {}

  // CREATE OR UPDATE RATING (INTERVIEW LEVEL LOGIC)
  async create(data: any, userId: number, storeId: number) {
    if (!userId || !storeId) {
      throw new BadRequestException('userId and storeId are required');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const store = await this.storeRepo.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    let rating = await this.ratingRepo.findOne({
      where: {
        user: { id: userId },
        store: { id: storeId },
      },
      relations: ['user', 'store'],
    });

    // If rating exists → update
    if (rating) {
      rating.rating = data.rating;
      return this.ratingRepo.save(rating);
    }

    // Else create new rating
    rating = this.ratingRepo.create({
      rating: data.rating,
      user,
      store,
    });

    return this.ratingRepo.save(rating);
  }

  // GET ALL RATINGS
  async findAll() {
    return this.ratingRepo.find({
      relations: ['user', 'store'],
    });
  }

  // GET SINGLE RATING (optional but interview useful)
  async findOne(id: number) {
    return this.ratingRepo.findOne({
      where: { id },
      relations: ['user', 'store'],
    });
  }

  // DELETE RATING (bonus feature)
  async remove(id: number) {
    const rating = await this.ratingRepo.findOne({ where: { id } });
    if (!rating) throw new NotFoundException('Rating not found');

    return this.ratingRepo.remove(rating);
  }
}