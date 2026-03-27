import { inject, injectable } from "tsyringe";
import { deleteUserSchema, } from "..//..//..//../validations/user.validation";
import { IUserRepository } from "..//..//..//../repositories/interface/IUserrepository";
import { NotFoundError } from "..//..//..//../shared/errors/NotFoundError";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string) {
    const parsed = deleteUserSchema.parse({ params: { id } });

    const user = await this.userRepository.findById(parsed.params.id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    await this.userRepository.delete(parsed.params.id);
  }
}