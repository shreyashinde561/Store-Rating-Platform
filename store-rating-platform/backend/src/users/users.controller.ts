import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(
      createUserDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id/password')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Param('id') id: string,
    @Body() body: { password: string },
  ) {
    return this.usersService.updatePassword(
      Number(id),
      body.password,
    );
  }
}
