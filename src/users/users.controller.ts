import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSubcategoriesByCategory(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Post('/:id')
  @HttpCode(HttpStatus.OK)
  async changeUserCredentials(
    @Param('id') id: string,
    @Body() dto: CredentialsDto,
  ) {
    return await this.usersService.changeUserCredentials(id, dto);
  }
}
