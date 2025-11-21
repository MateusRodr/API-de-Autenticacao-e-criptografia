import { container } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { RefreshTokenRepository } from "../repositories/refreshToken.repository";
import { IUserRepository } from "../repositories/interface/IUserrepository";
import { IRefreshTokenRepository } from "../repositories/interface/IRefreshTokenRepository";
import { UserService } from "../services/user.service";
import { RefreshTokenService } from "../services/refreshToken.service";

container.registerInstance(PrismaClient, new PrismaClient());
container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);
container.registerSingleton<IRefreshTokenRepository>("IRefreshTokenRepository",RefreshTokenRepository)
container.registerSingleton(UserService);
container.registerSingleton(RefreshTokenService)