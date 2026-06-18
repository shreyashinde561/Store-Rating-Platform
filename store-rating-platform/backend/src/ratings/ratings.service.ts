import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rating } from './rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>,
  ) {}

  // Submit new rating
  async create(data: any, user: any, store: any) {
    const existing = await this.ratingRepo.findOne({
      where: {
        user: { id: user.id },
        store: { id: store.id },
      },
    });

    if (existing) {
      throw new BadRequestException(
        'You already rated this store',
      );
    }

    const rating = this.ratingRepo.create({
      rating: data.rating,
      user,
      store,
    });

    return this.ratingRepo.save(rating);
  }

  // Get all ratings
  async findAll() {
    return this.ratingRepo.find();
  }

  // Update existing rating
  async updateRating(
    storeId: number,
    ratingValue: number,
    userId: number,
  ) {
    const existing = await this.ratingRepo.findOne({
      where: {
        user: { id: userId },
        store: { id: storeId },
      },
    });

    if (!existing) {
      throw new BadRequestException(
        'Rating not found',
      );
    }

    existing.rating = ratingValue;

    return this.ratingRepo.save(existing);
  }
}