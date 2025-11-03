import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { User } from "../entity/user.entity";
import { UserMapper } from "../mappers/user.mapper";