import { User } from "../../entities/user.entity";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findPaginated(page: number, limit:number): Promise<{data: User[]; total: number}>
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>; 
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
