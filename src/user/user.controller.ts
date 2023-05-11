import { CreateUserDto } from './create-user.dto';
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
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const users = await this.userService.findAll();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get('/:id')
  async findById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const user: User = await this.userService.findById(id);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
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
      const user = { id, name, age, gender };
      await this.userService.create(user);
      res.status(HttpStatus.CREATED).send();
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete('/:id')
  async deleteById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      await this.userService.delete(id);
      res.status(HttpStatus.OK).send();
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
