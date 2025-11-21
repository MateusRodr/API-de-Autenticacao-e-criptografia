import { RefreshToken } from "../entities/refreshToken.entity";

export class RefreshTokenMapper {
    static toPrisma(raw: RefreshToken) {
        return {
            id: raw.getId(),
            token: raw.getToken(),
            userId: raw.getUserId(),
            expiresIn: raw.getExpiresIn(),
        };
    }
    static toDomain(raw:any): RefreshToken {
        return new RefreshToken({
            id: raw.id,
            token: raw.token,
            userId: raw.userId,
            expiresIn: raw.expiresIn,
        })
    }
}