import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async findAll(
    page: number,
    size: number,
    query: string,
    order: string
  ): Promise<User[]> {
    const findSize = size ? size : 10;
    const skip = page ? page * size : 0;
    const findParams: FindManyOptions<User> = {
      take: findSize,
      skip: skip,
      order: {
        id: order === 'desc' ? 'DESC' : 'ASC',
      },
    };
    if (query) {
      findParams.where = {
        name: query,
      };
    }
    const [users, total] = await this.usersRepository.findAndCount(findParams);
    return users;
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(user: User): Promise<boolean> {
    try {
      const newUser = { ...user };
      await this.usersRepository.save(newUser);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(user: User): Promise<User> {
    Object.keys(user).forEach((key) => {
      if (typeof user[key] === 'undefined') {
        delete user[key];
      }
    });
    await this.usersRepository.save(user);
    return await this.findOne(user.id);
  }
}
