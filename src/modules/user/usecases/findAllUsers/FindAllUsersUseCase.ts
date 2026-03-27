import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../..//../../repositories/interface/IUserrepository";
import { NotFoundError } from "..//../../../shared/errors/NotFoundError";

@injectable()
export class FindAllUserUseCase {
    constructor (
        @inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}

    async execute() {
        const users = await this.userRepository.findAll();

        if(users.length === 0){ 
          throw new NotFoundError("No users Found")
        }
        return users;
    }
}