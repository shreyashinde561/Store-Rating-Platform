import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { RatingsModule } from '../ratings/ratings.module';

@Module({
  imports: [RatingsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}