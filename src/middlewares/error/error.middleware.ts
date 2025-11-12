import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/errors/appError';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      error: err.name || 'Error',
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    statusCode: 500,
    error: 'InternalServerError',
    message: 'Something went wrong',
  });
};
