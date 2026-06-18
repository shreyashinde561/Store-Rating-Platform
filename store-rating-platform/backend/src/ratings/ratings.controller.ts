import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
} from '@nestjs/common';

import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
  ) {}

  // Submit a new rating
  @Post()
  create(@Body() body: any) {
    return this.ratingsService.create(
      body,
      body.user,
      body.store,
    );
  }

  // Get all ratings
  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  // Update an existing rating
  @Patch(':storeId')
  update(
    @Param('storeId') storeId: string,
    @Body() body: any,
  ) {
    return this.ratingsService.updateRating(
      Number(storeId),
      body.rating,
      body.userId,
    );
  }
}