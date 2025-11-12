import { inject, injectable } from "tsyringe";
import { User } from "../entities/user.entity";
import { 
  getUserSchema, 
  createUserSchema, 
  deleteUserSchema, 
  updateUserSchema 
} from "../validations/user.validation";
import { IUserRepository } from "../repositories/interface/IUserrepository";
import {UpdateUserDTO } from "../dtos/user.dto";
import { ConflictError } from "../shared/errors/ConflictError";
import { NotFoundError } from "../shared/errors/NotFoundError";

@injectable()
export class UserService {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

async create(data: { name: string; email: string; password: string }) {
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

  return this.userRepository.create(user);
}

  async findAll() {
    const users = await this.userRepository.findAll();

    if(UserService.length === 0){ 
      throw new NotFoundError("No users Found")
    }
    return users;
  }

  async findById(id: string) {
    const parsed = getUserSchema.parse({ params: { id } });
    const user = await this.userRepository.findById(parsed.params.id);

    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }


  async update(id: string, userData: UpdateUserDTO): Promise<User> {
    const parsed = updateUserSchema.parse({ params: { id }, body: userData });
    const existing = await this.userRepository.findById(parsed.params.id);

    if (!existing) {
      throw new NotFoundError("User not found");
    }

    if(parsed.body.email) {
      const emailOwner = await this.userRepository.findByEmail(parsed.body.email)
      if(emailOwner && emailOwner.id !== existing.id) {
        throw new ConflictError("Email already in use by another user")
      }
    }

    const updatedUser = new User({
      id: existing.id,
      name: parsed.body.name ?? existing.getName(),
      email: parsed.body.email ?? existing.getEmail(),
      password: parsed.body.password ?? existing.getPassword(),
    });

    return this.userRepository.update(updatedUser);
  }

  async delete(id: string) {
    const parsed = deleteUserSchema.parse({ params: { id } });
    const user = await this.userRepository.findById(parsed.params.id)

    if(!user) throw new NotFoundError("User not found")

    await this.userRepository.delete(parsed.params.id);
  }
}
