import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const authMiddlewares: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as TokenPayload;
    (req as any).userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
