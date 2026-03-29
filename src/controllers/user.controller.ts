import { container } from "tsyringe";
import { RequestHandler } from "express";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { catchAsync } from "../shared/utils/catchasync";
import { CreateUserUseCase } from "../modules/user/usecases/createUser/CreateUserUseCase";
import { FindUsersPaginatedUseCase } from "../modules/user/usecases/findUsersPaginated/FindUsersPaginatedUseCase";
import { FindUserByIdUseCase } from "../modules/user/usecases/findUserById/FindUserByIdUseCase";
import { UpdateUserUseCase } from "../modules/user/usecases/updateUser/UpdateUserUseCase";
import { DeleteUserUseCase } from "../modules/user/usecases/deleteUser/DeleteUserUseCase";

export const createUser: RequestHandler = catchAsync (async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 8);
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const newUser = await createUserUseCase.execute({ 
      name, email, password: hashedPassword 
    });

    const token = sign({ id: newUser.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    return res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.getName(),
        email: newUser.getEmail(),
      },
      token,
    });
});


export const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const useCase = container.resolve(FindUsersPaginatedUseCase);

  const result = await useCase.execute(page, limit);

  return res.json({
    data: result.data,
    pagination: {
      total: result.total,
      page: result.page,
      limit,
      totalPages: result.totalPages,
      nextPage: result.page < result.totalPages ? result.page + 1 : null,
      prevPage: result.page > 1 ? result.page - 1 : null,
    },
  });
});

export const getUserById: RequestHandler = catchAsync (async (req, res) => {
  const { id } = req.params;
  const useCase = container.resolve(FindUserByIdUseCase);
  const user = await useCase.execute(id);
  return res.json({ user });
});

export const updateUser: RequestHandler = catchAsync (async (req, res) => {
  const { id } = req.params;
  const useCase = container.resolve(UpdateUserUseCase);
  const updatedUser = await useCase.execute(id, req.body);
  return res.json({ user: updatedUser });
});

export const deleteUser: RequestHandler = catchAsync (async (req, res) => {
  const { id } = req.params;
  const useCase = container.resolve(DeleteUserUseCase);
  await useCase.execute(id);
  return res.status(204).send();
});

