import 'reflect-metadata';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

const mockUserRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const userService = new UserService(mockUserRepository);

describe('UserService', () => {
  it('should create a user', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(
      new User({ id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password' })
    );

    const user = await userService.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
    expect(user.getName()).toBe('John Doe');
  });

  it('should get all users', async () => {
    mockUserRepository.findAll.mockResolvedValue([
      { toJSON: () => ({ id: '1', name: 'John Doe', email: 'john.doe@example.com' }) },
    ]);
    const users = await userService.findAll();
    expect(users.length).toBe(1);
    expect(users[0].toJSON().name).toBe('John Doe');
  });

  it('should get a user by ID', async () => {
    const validdUUID = '123e4567-e89b-12d3-a456-426614174000';
    mockUserRepository.findById.mockResolvedValue(
      new User({ id: validdUUID, name: 'John Doe', email: 'john.doe@example.com', password: 'password' })
    );

    const user = await userService.findById(validdUUID);
    expect(user.id).toBe(validdUUID);
    expect(user.getName()).toBe('John Doe');
  });

  it('should update a user', async () => {
    const validdUUID = '123e4567-e89b-12d3-a456-426614174000';
    mockUserRepository.findById.mockResolvedValue(
      new User({ id: validdUUID, name: 'John Doe', email: 'john.doe@example.com', password: 'password' })
    );
    mockUserRepository.update.mockResolvedValue(
      new User({ id: validdUUID, name: 'jane doe', email: 'jane.doe@example.com', password: 'password' })
    );

    const user = await userService.update(validdUUID, {
      name: 'jane doe',
      email: 'jane.doe@example.com',
    });

    expect(user.id).toBe(validdUUID);
    expect(user.getName()).toBe('jane doe');
    expect(user.getEmail()).toBe('jane.doe@example.com');
  });

    it('should delete a user', async () => {
    const validdUUID = '123e4567-e89b-12d3-a456-426614174000';
    mockUserRepository.findById.mockResolvedValue({
        id:validdUUID,
        name: 'jane doe',
        email: 'jane.doe@example.com',
    });
    mockUserRepository.delete.mockResolvedValue(undefined);

    await expect(userService.delete(validdUUID)).resolves.toBeUndefined();

    })

});
