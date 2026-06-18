import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Store } from './store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  // CREATE STORE
  async create(store: Partial<Store>) {
    const newStore = this.storeRepository.create(store);

    return this.storeRepository.save(newStore);
  }

  // GET ALL + SEARCH + AVERAGE RATING
  async findAll(query?: any) {
    const stores = await this.storeRepository.find({
      relations: ['ratings'],
    });

    const storesWithRatings = stores.map((store) => ({
      ...store,

      averageRating:
        store.ratings.length > 0
          ? (
              store.ratings.reduce(
                (sum, rating) => sum + rating.rating,
                0,
              ) / store.ratings.length
            ).toFixed(1)
          : 'No Ratings',
    }));

    if (!query || Object.keys(query).length === 0) {
      return storesWithRatings;
    }

    const { name, address, email } = query;

    return storesWithRatings.filter((store) => {
      const matchName = name
        ? store.name
            .toLowerCase()
            .includes(name.toLowerCase())
        : true;

      const matchAddress = address
        ? store.address
            .toLowerCase()
            .includes(address.toLowerCase())
        : true;

      const matchEmail = email
        ? store.email
            ?.toLowerCase()
            .includes(email.toLowerCase())
        : true;

      return (
        matchName &&
        matchAddress &&
        matchEmail
      );
    });
  }

  // GET SINGLE STORE
  async findOne(id: number) {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: ['ratings'],
    });

    if (!store) {
      return null;
    }

    return {
      ...store,

      averageRating:
        store.ratings.length > 0
          ? (
              store.ratings.reduce(
                (sum, rating) => sum + rating.rating,
                0,
              ) / store.ratings.length
            ).toFixed(1)
          : 'No Ratings',
    };
  }
}
