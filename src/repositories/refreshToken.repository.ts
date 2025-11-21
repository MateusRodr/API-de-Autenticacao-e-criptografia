import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IRefreshTokenRepository } from "./interface/IRefreshTokenRepository";
import { RefreshToken } from "../entities/refreshToken.entity";
import { RefreshTokenMapper } from "../mappers/refreshToken.mapper";

@injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(@inject(PrismaClient) private prisma: PrismaClient) {}

  async create(entity: RefreshToken): Promise<void> {
    const data = RefreshTokenMapper.toPrisma(entity);
    await this.prisma.refreshToken.create({ data });
  }

  async find(token: string): Promise<RefreshToken | null> {
    const result = await this.prisma.refreshToken.findUnique({
      where: { token },
    });
    return result ? RefreshTokenMapper.toDomain(result) : null;
  }

  async delete(token: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { token },
    });
  }
}
