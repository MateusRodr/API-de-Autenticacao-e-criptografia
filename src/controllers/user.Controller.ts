import { container } from "tsyringe";
import { RequestHandler } from "express";
import { UserService } from "../services/user.service";
import { z } from "zod";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

const userService = container.resolve(UserService);

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userService.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: "User already exists with this email." });
    }

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
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.issues });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await userService.findAll();
    res.json({ users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await userService.update(id, req.body);
    res.json({ user: updatedData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.delete(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
