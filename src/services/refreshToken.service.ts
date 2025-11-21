import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { IRefreshTokenRepository } from "../repositories/interface/IRefreshTokenRepository";
import { AppError } from "../shared/errors/appError";
import { refreshTokenSchema, logoutSchema } from "../validations/auth.validation";
import { RefreshToken } from "../entities/refreshToken.entity";

@injectable()
export class RefreshTokenService {
  constructor(
    @inject("IRefreshTokenRepository")
    private readonly refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async generate(userId: string) {
    const token = sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });

    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 7);

    const entity = new RefreshToken(userId, token, expiresIn);

    await this.refreshTokenRepository.create(entity);

    return token;
  }

  async refresh(data: any) {
    const parsed = refreshTokenSchema.parse(data);

    const refreshToken = parsed.body.refreshToken;

    const stored = await this.refreshTokenRepository.find(refreshToken);

    if (!stored) throw new AppError("Invalid refresh token", 401);

    if (stored.expiresIn < new Date()) {
      await this.refreshTokenRepository.delete(refreshToken);
      throw new AppError("Refresh token expired", 401);
    }

    const newToken = sign(
      { id: stored.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return newToken;
  }

  async logout(data: any) {
    const parsed = logoutSchema.parse(data);

    const refreshToken = parsed.body.refreshToken;

    await this.refreshTokenRepository.delete(refreshToken);

    return { message: "Logout successful" };
  }
}
