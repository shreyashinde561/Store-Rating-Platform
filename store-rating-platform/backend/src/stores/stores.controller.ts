import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.storesService.create(body);
  }

  // 🔥 SEARCH + LIST ALL
  @Get()
  findAll(@Query() query: any) {
    return this.storesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(Number(id));
  }
}