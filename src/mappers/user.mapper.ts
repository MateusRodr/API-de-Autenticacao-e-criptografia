import { User } from "../entities/user.entity";
import { UserORM } from "../infra/database/typeorm/entities/user.entityORM";

export class UserMapper {
  static toDomain(raw: UserORM): User {
    return new User({
      id: raw.id,
      email: raw.email,
      name: raw.name,
      password: raw.password,
    });
  }

  static toORM(user: User): UserORM {
    const orm = new UserORM();

    orm.id = user.id!;
    orm.email = user.getEmail();
    orm.name = user.getName();
    orm.password = user.getPassword();

    return orm;
  }
}