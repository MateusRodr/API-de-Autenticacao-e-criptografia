import { injectable } from "tsyringe";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserMapper } from "../mappers/user.mapper";
import { IUserRepository } from "./interface/IUserrepository";
import { UserORM } from "../infra/database/typeorm/entities/user.entityORM";
import { AppDataSource } from "../infra/database/typeorm/data-source";

@injectable()
export class UserRepository implements IUserRepository {
    private repo: Repository<UserORM>;
  constructor() {
    this.repo = AppDataSource.getRepository(UserORM);
  }

  async create(user: User): Promise<User> {
    const data = UserMapper.toORM(user);
    const created = await this.repo.save(data);
    return UserMapper.toDomain(created);
  }

  async findAll(): Promise<User[]> {
    const users = await this.repo.find();
    return users.map(UserMapper.toDomain);
  }

  async findPaginated(page: number, limit: number): Promise<{ data: User[]; total: number; }> {
    const [user, total] = await Promise.all([
      this.repo.find({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.repo.count(),
    ]);
    const data = user.map(UserMapper.toDomain);
    return { data, total };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> { 
    const user = await this.repo.findOne({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.repo.update({ id: user.id }, UserMapper.toORM(user));
    return UserMapper.toDomain(updatedUser.raw);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}
