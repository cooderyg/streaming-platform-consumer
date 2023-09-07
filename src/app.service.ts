import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async getHello(): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { id: '0098d3bb-7669-4b99-9717-1fc09c922681' },
    });
    return user;
  }
}
