import { container } from "tsyringe";
import { IUserRepository } from "../repositories/interface/IUserrepository";
import { UserRepository } from "..//repositories/user.repository";
import { IRefreshTokenRepository } from "..//repositories/interface/IRefreshTokenRepository";
import { RefreshTokenRepository } from "..//repositories/refreshToken.repository";

container.registerSingleton<IUserRepository>(
  "IUserRepository",
  UserRepository
);

container.registerSingleton<IRefreshTokenRepository>(
  "IRefreshTokenRepository",
  RefreshTokenRepository
);