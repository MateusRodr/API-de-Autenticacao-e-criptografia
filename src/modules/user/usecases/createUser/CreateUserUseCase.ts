import { inject, injectable } from "tsyringe";
import { User } from "../../../../entities/user.entity";
import { createUserSchema } from "../../../../validations/user.validation";
import { IUserRepository } from "../../../../repositories/interface/IUserrepository";
import { ConflictError } from "../..//../../shared/errors/ConflictError";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}

    async execute(data: {name: string; email: string; password: string}){
        const parsedData = createUserSchema.parse({ body: data }).body;

        const existingUser = await this.userRepository.findByEmail(parsedData.email);
        if (existingUser) {
          throw new ConflictError("User with this email already exists");
        }
        
        const user = new User({
          id: crypto.randomUUID(),
          name: parsedData.name,
          email: parsedData.email,
          password: parsedData.password,
        });
        return await this.userRepository.create(user);

    }
}