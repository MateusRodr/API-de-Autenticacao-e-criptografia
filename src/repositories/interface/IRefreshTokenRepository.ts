export interface IRefreshTokenRepository {
  create(userId: string, token: string, expiresIn: Date): Promise<void>;
  find(token: string): Promise<{ userId: string; expiresIn: Date } | null>;
  delete(token: string): Promise<void>;
}
