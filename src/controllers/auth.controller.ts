import { RequestHandler } from "express";
import { sign, verify } from "jsonwebtoken";
import { container } from "tsyringe";
import { catchAsync } from "../shared/utils/catchasync";
import { TokenNotProvidedError } from "../shared/errors/TokenNotProvidedError";
import { AuthenticateUserUseCase } from "..//modules/auth/usecases/authenticateUser/AuthenticateUserUseCase"

export const login: RequestHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const useCase = container.resolve<AuthenticateUserUseCase>(
    AuthenticateUserUseCase,
  );

  const user = await useCase.execute({ email, password });

  const token = sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return res.json({
    user: {
      id: user.id,
      name: user.getName(),
      email: user.getEmail(),
    },
    accessToken: token,
  });
});

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const authMiddleware: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new TokenNotProvidedError("Token not provided");
    }

    const [, token] = authorization.split(" ");
    const decoded = verify(token, process.env.JWT_SECRET!) as TokenPayload;
    (req as any).userId = decoded.id;
    return next();
  },
);
