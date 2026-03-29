import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { IRefreshTokenRepository } from "..//..//../../repositories/interface/IRefreshTokenRepository";
import { AppError } from "..//../../../shared/errors/appError";

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("IRefreshTokenRepository")
    private readonly refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError("Refresh token not provided", 400);
    }

    const stored = await this.refreshTokenRepository.find(refreshToken);

    if (!stored) {
      throw new AppError("Invalid refresh token", 401);
    }

    if (stored.getExpiresIn() < new Date()) {
      await this.refreshTokenRepository.delete(refreshToken);
      throw new AppError("Refresh token expired", 401);
    }

    const newToken = sign(
      { id: stored.getUserId() },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return newToken;
  }
}