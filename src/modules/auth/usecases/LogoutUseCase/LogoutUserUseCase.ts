import { inject, injectable } from "tsyringe";
import { IRefreshTokenRepository } from "..//..//../../repositories/interface/IRefreshTokenRepository";
import { logoutSchema } from "..//..//../../validations/auth.validation";

@injectable()
export class LogoutUseCase {
  constructor(
    @inject("IRefreshTokenRepository")
    private readonly refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(data: any) {
    const parsed = logoutSchema.parse(data);

    const refreshToken = parsed.refreshToken;

    await this.refreshTokenRepository.delete(refreshToken);

    return { message: "Logout successful" };
  }
}