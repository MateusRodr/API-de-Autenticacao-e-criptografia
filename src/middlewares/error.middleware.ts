import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../shared/errors/appError";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      name: err.name,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      name: "ValidationError",
      message: "Invalid input data",
      issues: err.issues.map(e => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  console.error("🔥 Unexpected error:", err);

  return res.status(500).json({
    status: "error",
    name: "InternalServerError",
    message: "Unexpected server error",
  });
}
