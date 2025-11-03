import { Injectable, Inject } from "@nestjs/common";
import { User } from "../entity/user.entity";
import { getUserSchema,createUserSchema,deleteUserSchema,updateUserSchema } from "../validations/user.validation";

@Injectable()
export class UserService {
  constructor(
    private userRepository: typeof User
  ) {}


  async create(data:User) {
    const parsedData = createUserSchema.parse({ body: data }).body;
    const userexists = await this.userRepository.findOne({ where: { email: parsedData.email } }) as any;
    if (userexists) {
      throw new Error("User with this email already exists");
    }
    const user = new User({
      id: crypto.randomUUID(),
      name: parsedData.name,
      email: parsedData.email,
      password: parsedData.password,
    })
    return this.userRepository.create(user);
  }


  async findAll(){
    const users = await this.userRepository.findAll();
    return this.userRepository.findAll();
  }

  async findById(id: string) {
    const user = getUserSchema.parse({ params: { id } }).params;
    if (!user) throw new Error('User not found');
    return this.userRepository.findByPk(id);
  }

  async update(id: string, user: User) {
    const parsedParams = updateUserSchema.parse({ params: { id }, body: user });
    const existing = await this.userRepository.findByPk(parsedParams.id);
    if (!existing) {
      throw new Error("User not found");
    }
    const updatedUser = new User(parsedParams.body);
    return this.userRepository.update(updatedUser, { where: { id: parsedParams.id } });
  }

  async delete(id: string) {
    const parsedParams = deleteUserSchema.parse({ params: { id } }).params;
    return this.userRepository.delete({ where: { id: parsedParams.id } });
  }
}
