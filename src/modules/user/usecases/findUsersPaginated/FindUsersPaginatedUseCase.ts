import { inject, injectable } from "tsyringe";
import { IUserRepository } from "..//../..//../repositories/interface/IUserrepository";

@injectable()
export class FindUsersPaginatedUseCase {
    constructor(
        @inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}

    async execute(page:number, limit:number){
        const {data, total} = await this.userRepository.findPaginated(page, limit)

        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total/limit)
        }
    }
}