import { container } from 'tsyringe';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';
import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../repository/interface/IUserrepository';

container.registerInstance(PrismaClient, new PrismaClient());
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton<UserService>('UserService', UserService);