import { Controller, Get, Param } from '@nestjs/common';
import { RatingsService } from '../ratings/ratings.service';

@Controller('owner')
export class AdminController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get("dashboard/:storeId")
  getDashboard(@Param("storeId") storeId: string) {
    return this.ratingsService.getStoreAnalytics(Number(storeId));
  }
}