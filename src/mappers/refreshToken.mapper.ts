import { RefreshToken } from "../entities/refreshToken.entity";
import { RefreshTokenORM } from "../infra/database/typeorm/entities/RefreshTokenORM";

export class RefreshTokenMapper {
  static toORM(refreshToken: RefreshToken): RefreshTokenORM {
    const orm = new RefreshTokenORM();

    orm.id = refreshToken.getId();
    orm.token = refreshToken.getToken();
    orm.userId = refreshToken.getUserId();
    orm.expiresIn = refreshToken.getExpiresIn();

    return orm;
  }

  static toDomain(raw: RefreshTokenORM): RefreshToken {
    return new RefreshToken({
      id: raw.id,
      token: raw.token,
      userId: raw.userId,
      expiresIn: raw.expiresIn,
    });
  }
}