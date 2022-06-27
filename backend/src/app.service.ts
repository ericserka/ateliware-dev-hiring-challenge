import { Injectable } from '@nestjs/common';
import { Prisma, Repository, User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async repository(
    repositoryWhereUniqueInput: Prisma.RepositoryWhereUniqueInput,
  ): Promise<Repository | null> {
    return this.prisma.repository.findUnique({
      where: repositoryWhereUniqueInput,
    });
  }

  async repositories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RepositoryWhereUniqueInput;
    where?: Prisma.RepositoryWhereInput;
    orderBy?: Prisma.RepositoryOrderByWithRelationInput;
  }): Promise<Repository[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.repository.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRepository(
    data: Prisma.RepositoryCreateInput,
  ): Promise<Repository> {
    return this.prisma.repository.create({
      data,
    });
  }
}
