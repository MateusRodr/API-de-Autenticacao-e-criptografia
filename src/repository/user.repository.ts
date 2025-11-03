import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { User } from "../entity/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { IUserRepository } from "./interface/IUserrepository";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    const data = UserMapper.toPrisma(user);
    const created = await this.prisma.user.create({ data });
    return UserMapper.toDomain(created);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(UserMapper.toDomain);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> { 
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: UserMapper.toPrisma(user),
    });
    return UserMapper.toDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
