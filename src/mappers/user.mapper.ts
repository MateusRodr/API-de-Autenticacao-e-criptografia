import { User } from "../entities/user.entity";
import { Prisma, User as PrismaUser } from "@prisma/client"

export class UserMapper {
    static toDomain(raw: PrismaUser): User {
        return new User({
            id: raw.id,
            email: raw.email,
            name: raw.name,
            password: raw.password
        });
    }

    static toPrisma(user: User): Prisma.UserCreateInput {
        return {
            id: user.id!,
            email: user.getEmail(),
            name: user.getName(),
            password: user.getPassword()
        };
    }
}