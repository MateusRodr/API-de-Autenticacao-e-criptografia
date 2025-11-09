import { container } from "tsyringe";
import { RequestHandler } from "express";
import { UserService } from "../services/user.service";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

const userService = container.resolve(UserService);

export const createUser: RequestHandler = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};


export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await userService.findAll();
  return res.json({ users });
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
  const { id } = req.params;
  const user = await userService.findById(id);
  return res.json({ user });
  } catch (error) {
    next(error)   
  }

};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
  const { id } = req.params;
  const updatedUser = await userService.update(id, req.body);
  return res.json({ user: updatedUser });
  } catch (error) {
    next(error)
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
  const { id } = req.params;
  await userService.delete(id);
  return res.status(204).send();
  } catch (error) {
    next(error)
  }
};

