import { inject, injectable } from "tsyringe";
import { getUserSchema } from "..//..//..//../validations/user.validation";
import { IUserRepository } from "../..//..//../repositories/interface/IUserrepository";
import { IRedisProvider } from "../../../../repositories/interface/IRedisProvider";
import { NotFoundError } from "..//..//..//../shared/errors/NotFoundError";

@injectable()
export class FindUserByIdUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository,

    @inject("IRedisProvider")
    private readonly redisProvider: IRedisProvider,
  ) {}

  async execute(id: string) {
    const parsed = getUserSchema.parse({ params: { id } });

    const cacheKey = `user:${parsed.params.id}`;
    const cached = await this.redisProvider.get(cacheKey);

    if (cached) {
      return cached;
    }

     const user = await this.userRepository.findById(parsed.params.id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await this.redisProvider.set(cacheKey, user, 3600);
    return user;
  }
}
