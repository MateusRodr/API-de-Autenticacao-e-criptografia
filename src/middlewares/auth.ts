import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { catchAsync } from '../shared/utils/catchasync';
import { TokenNotProvidedError } from '../shared/errors/TokenNotProvidedError';
import { AppError } from '../shared/errors/appError';

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const authMiddleware: RequestHandler = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new TokenNotProvidedError('Token not provided');
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.userId = decoded.id;
    next();
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }
});
