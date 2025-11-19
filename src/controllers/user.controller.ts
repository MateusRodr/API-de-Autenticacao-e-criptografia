import { container } from "tsyringe";
import { RequestHandler } from "express";
import { UserService } from "../services/user.service";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { catchAsync } from "../shared/utils/catchasync";

const userService = container.resolve(UserService);

export const createUser: RequestHandler = catchAsync (async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 8);
    const newUser = await userService.create({ name, email, password: hashedPassword });

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

export const getAllUsers: RequestHandler = catchAsync (async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10;
  const result = await userService.findPaginated(page, limit);
return res.json({
  data: result.data,
  pagination: {
    total: result.total,
    page: result.page,
    limit,
    totalPages: result.totalPages,
    nextPage: result.page < result.totalPages ? result.page + 1 : null,
    prevPage: result.page > 1 ? result.page - 1 : null,
    nextUrl: result.page < result.totalPages ? `${req.baseUrl}?page=${result.page + 1}&limit=${limit}` : null,
    prevUrl: result.page > 1 ? `${req.baseUrl}?page=${result.page - 1}&limit=${limit}` : null,
  },
});

});

export const getUserById: RequestHandler = catchAsync (async (req, res) => {
  const { id } = req.params;
  const user = await userService.findById(id);
  return res.json({ user });
});

export const updateUser: RequestHandler = catchAsync (async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userService.update(id, req.body);
  return res.json({ user: updatedUser });
});

export const deleteUser: RequestHandler = catchAsync (async (req, res) => {
  const { id } = req.params;
  await userService.delete(id);
  return res.status(204).send();
});

