import { container } from "tsyringe";
import { IUserRepository } from "../repositories/interface/IUserrepository";
import { UserRepository } from "..//repositories/user.repository";
import { IRefreshTokenRepository } from "..//repositories/interface/IRefreshTokenRepository";
import { RefreshTokenRepository } from "..//repositories/refreshToken.repository";
import { IRedisProvider } from "../repositories/interface/IRedisProvider";
import { RedisProvider } from "../infra/database/redis/RedisProvider";

container.registerSingleton<IRedisProvider>(
  "IRedisProvider",
  RedisProvider
);

container.registerSingleton<IUserRepository>(
  "IUserRepository",
  UserRepository
);

container.registerSingleton<IRefreshTokenRepository>(
  "IRefreshTokenRepository",
  RefreshTokenRepository
);