import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { IRefreshTokenRepository } from "..//..//../../repositories/interface/IRefreshTokenRepository";
import { RefreshToken } from "..//..//../../entities/refreshToken.entity";

@injectable()
export class GenerateRefreshTokenUseCase {
  constructor(
    @inject("IRefreshTokenRepository")
    private readonly refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(userId: string) {
    const token = sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });

    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 7);

    const entity = new RefreshToken({
      id: crypto.randomUUID(),
      userId,
      token,
      expiresIn,
    });

    await this.refreshTokenRepository.create(entity);

    return token;
  }
}