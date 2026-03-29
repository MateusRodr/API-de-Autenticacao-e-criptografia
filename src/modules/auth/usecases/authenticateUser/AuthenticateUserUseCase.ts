import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { IUserRepository } from "../..//..//..//repositories/interface/IUserrepository";
import { AppError } from "../../../../shared/errors/appError";

interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IAuthenticateUserDTO) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const passwordMatch = await compare(password, user.getPassword());

    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    return user;
  }
}