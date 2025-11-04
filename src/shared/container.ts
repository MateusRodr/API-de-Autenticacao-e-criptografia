import { container } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../repository/user.repository";
import { IUserRepository } from "../repository/interface/IUserrepository";
import { UserService } from "../services/user.service";

container.registerInstance(PrismaClient, new PrismaClient());
container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);
container.registerSingleton(UserService);
