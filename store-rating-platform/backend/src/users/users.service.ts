import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // CREATE USER (SECURE - NO PASSWORD RETURN)
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // REMOVE PASSWORD BEFORE RETURN
    const { password, ...result } = savedUser;
    return result;
  }

  // GET ALL USERS (SECURE - NO PASSWORD)
  async findAll() {
    const users = await this.userRepository.find();

    return users.map(({ password, ...user }) => user);
  }

  // LOGIN SUPPORT
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}