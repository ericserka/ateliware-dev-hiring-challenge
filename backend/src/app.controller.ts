import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  Repository as RepositoryModel,
  User as UserModel,
} from '@prisma/client';
import { AppService } from './app.service';

// TODO: implementar DTOs nos controllers
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('repository/:id')
  async getRepositoryById(@Param('id') id: string): Promise<RepositoryModel> {
    return this.appService.repository({ id: Number(id) });
  }

  @Get('repositories')
  async getRepositories(
    @Param('userId') userId: string,
  ): Promise<RepositoryModel[]> {
    return this.appService.repositories({
      where: { userId },
    });
  }

  @Post('repository')
  async createRepository(
    @Body() repositoryData: { dataObj: object; userId: string },
  ): Promise<RepositoryModel> {
    const { dataObj, userId } = repositoryData;
    return this.appService.createRepository({
      dataObj,
      User: { connect: { id: userId } },
    });
  }

  @Post('user')
  async createUser(@Body() userData: { id: string }): Promise<UserModel> {
    return this.appService.createUser(userData);
  }
}
