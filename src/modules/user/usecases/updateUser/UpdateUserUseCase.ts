import { inject, injectable } from "tsyringe";
import { User } from "..//..//../../entities/user.entity";
import { updateUserSchema } from "..//..//..//../validations/user.validation";
import { IUserRepository } from "..//..//..//../repositories/interface/IUserrepository";
import {UpdateUserDTO } from "..//..//..//../dtos/user.dto";
import { ConflictError } from "..//..//..//../shared/errors/ConflictError";
import { NotFoundError } from "..//..//..//../shared/errors/NotFoundError";

@injectable()
export class UpdateUserUseCase {
    constructor(
        @inject('IUserRepository')
        private readonly userRepository: IUserRepository
      ) {}

      async execute(id:string, userData: UpdateUserDTO) {
        const parsedData = updateUserSchema.parse({ params: { id }, body: userData });

        const existing = await this.userRepository.findById(parsedData.params.id)

        if(!existing){
          throw new NotFoundError("User not found")
        }

        if(parsedData.body.email){
          const emailExists = await this.userRepository.findByEmail(parsedData.body.email)
          if(emailExists){
            throw new ConflictError("Email already in use")
          }
        }

        const updatedUser = new User({
          id: existing.id,
          name: parsedData.body.name || existing.getName(),
          email: parsedData.body.email || existing.getEmail(),
          password: parsedData.body.password || existing.getPassword(),
        });

        return this.userRepository.update(updatedUser)
      }
}