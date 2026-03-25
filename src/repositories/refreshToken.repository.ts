import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { RefreshToken } from "../entities/refreshToken.entity";
import { RefreshTokenMapper } from "../mappers/refreshToken.mapper";
import { RefreshTokenORM } from "../infra/database/typeorm/entities/RefreshTokenORM";
import { AppDataSource } from "../infra/database/typeorm/data-source";

@injectable()
export class RefreshTokenRepository {
  private repo: Repository<RefreshTokenORM>;

  constructor() {
    this.repo = AppDataSource.getRepository(RefreshTokenORM);
  }

  async create(entity: RefreshToken): Promise<void> {
    const orm = RefreshTokenMapper.toORM(entity);
    await this.repo.save(orm);
  }

  async find(token: string): Promise<RefreshToken | null> {
    const result = await this.repo.findOne({
      where: { token },
    });

    return result ? RefreshTokenMapper.toDomain(result) : null;
  }

  async delete(token: string): Promise<void> {
    await this.repo.delete({ token });
  }
}