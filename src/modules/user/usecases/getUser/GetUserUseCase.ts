import { inject, injectable } from "tsyringe";
import { redisClient } from "../../../../infra/database/redis/redisClient";
import { UserRepository } from "../../../../repositories/user.repository";

@injectable()
export class GetUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(id: string) {
    const cacheKey = `user:${id}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const user = await this.userRepository.findById(id);

    await redisClient.set(cacheKey, JSON.stringify(user), "EX", 60);

    return user;
  }
}