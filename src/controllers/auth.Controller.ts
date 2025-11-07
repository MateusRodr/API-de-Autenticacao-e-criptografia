import { RequestHandler } from "express";
import { compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { container } from "tsyringe";
import { UserService } from "../services/user.service";

const userService = container.resolve(UserService);

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await compare(password, user.getPassword());
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return res.json({
      user: {
        id: user.id,
        name: user.getName(),
        email: user.getEmail(),
      },
      token,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as TokenPayload;
    (req as any).userId = decoded.id;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
