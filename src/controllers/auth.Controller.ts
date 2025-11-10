import { RequestHandler } from "express";
import { compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { container } from "tsyringe";
import { catchAsync } from "../utils/catchasync";
import { UserService } from "../services/user.service";
import { AppError } from "../shared/errors/appError";

const userService = container.resolve(UserService);

export const login: RequestHandler = catchAsync (async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401 );
    }

    const passwordMatch = await compare(password, user.getPassword());
    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
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

});

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const authMiddleware: RequestHandler = catchAsync (async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");
  const decoded = verify(token, process.env.JWT_SECRET!) as TokenPayload;
    (req as any).userId = decoded.id;
    return next();
});
