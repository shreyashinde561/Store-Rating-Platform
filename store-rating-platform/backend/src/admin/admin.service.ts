import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';
import { Rating } from '../ratings/rating.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Store)
    private storeRepo: Repository<Store>,

    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>,
  ) {}

  async getDashboard() {
    return {
      totalUsers: await this.userRepo.count(),
      totalStores: await this.storeRepo.count(),
      totalRatings: await this.ratingRepo.count(),
    };
  }

  async getStoreOwnerDashboard(ownerId: number) {
    const ratings = await this.ratingRepo.find({
      relations: ['user', 'store'],
    });

    const total = ratings.reduce((sum, r) => sum + r.rating, 0);

    const averageRating =
      ratings.length > 0 ? total / ratings.length : 0;

    return {
      averageRating,
      ratings: ratings.map((r) => ({
        user: r.user.name,
        rating: r.rating,
      })),
    };
  }
}