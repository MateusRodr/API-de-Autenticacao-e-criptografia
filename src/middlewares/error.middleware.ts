import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/appError";
import { ZodError } from "zod";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      name: "ValidationError",
      message: err.issues.map(e => e.message).join(", "),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      name: err.name,
      message: err.message,
    });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({
    status: "error",
    name: "InternalServerError",
    message: "Unexpected server error",
  });
}
