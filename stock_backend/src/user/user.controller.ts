import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(Number(id), dto);
  }

  @Put(':id/status')
  toggleStatus(@Param('id') id: string) {
    return this.userService.toggleStatus(Number(id));
  }

  @Put(':id/password')
  updatePassword(@Param('id') id: string, @Body() body: { password: string }) {
    return this.userService.updatePassword(Number(id), body.password);
  }
}
