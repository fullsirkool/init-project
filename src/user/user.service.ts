import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

const MOCK_USER = [
  {
    id: 1,
    name: 'Anhihi',
    age: 23,
    gender: 'male',
  },
  {
    id: 2,
    name: 'Bhihi',
    age: 21,
    gender: 'male',
  },
  {
    id: 3,
    name: 'Chihi',
    age: 20,
    gender: 'bede',
  },
  {
    id: 4,
    name: 'Dhihi',
    age: 23,
    gender: 'female',
  },
];

@Injectable()
export class UserService {
  private users: User[] = [...MOCK_USER];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async create(user: User): Promise<boolean> {
    try {
      const newUser = { ...user };
      const id = this.users.length > 0 ? [...this.users].pop().id + 1 : 1;
      newUser.id = id;
      this.users.push(newUser);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return this.users.find((user) => user.id === +id);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      this.users = this.users.filter((user) => user.id !== +id);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
