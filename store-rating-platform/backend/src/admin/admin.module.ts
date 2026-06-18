import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';
import { Rating } from '../ratings/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Store,
      Rating,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}