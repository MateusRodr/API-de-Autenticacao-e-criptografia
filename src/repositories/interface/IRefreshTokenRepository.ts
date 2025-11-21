import { RefreshToken } from "../../entities/refreshToken.entity";

export interface IRefreshTokenRepository {
  create(entity: RefreshToken): Promise<void>;
  find(token: string): Promise<RefreshToken | null>;
  delete(token: string): Promise<void>;
}

