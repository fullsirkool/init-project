import moment from 'moment';
import { CreateUserDto, FindUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(
    @Param() findUserDto: FindUserDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const { page, size, query, order } = findUserDto;
      const users = await this.userService.findAll(page, size, query, order);
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const user: User = await this.userService.findOne(+id);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ): Promise<void> {
    try {
      console.log('createUserDto', createUserDto);
      const { name, age, gender } = createUserDto;
      const id = 0;
      const createdAt = new Date();
      const updatedAt = undefined;
      const user = { id, name, age, gender, createdAt, updatedAt };
      await this.userService.create(user);
      res.status(HttpStatus.CREATED).send();
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete('/:id')
  async deleteById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      await this.userService.remove(+id);
      res.status(HttpStatus.OK).send();
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put('/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const { name, age, gender } = updateUserDto;
      const userId = +id;
      const createdAt = undefined;
      const updatedAt = new Date();
      const newUser = { id: userId, name, age, gender, createdAt, updatedAt };
      const user = await this.userService.update(newUser);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
