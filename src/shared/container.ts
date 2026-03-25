import { container } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { RefreshTokenRepository } from "../repositories/refreshToken.repository";
import { IUserRepository } from "../repositories/interface/IUserrepository";
import { IRefreshTokenRepository } from "../repositories/interface/IRefreshTokenRepository";
import { UserService } from "../services/user.service";
import { RefreshTokenService } from "../services/refreshToken.service";

container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);
container.registerSingleton<IRefreshTokenRepository>("IRefreshTokenRepository",RefreshTokenRepository)
container.registerSingleton(UserService);
container.registerSingleton(RefreshTokenService)