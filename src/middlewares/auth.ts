import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchasync';
import { AppError } from '../shared/errors/appError';

type tokenPayload = {
    id: string;
    iat: number;
    exp: number;
}

export const authMiddleware: RequestHandler = catchAsync (async(req,res, next) =>{
   const { authorization } = req.headers

   if(!authorization){
    throw new AppError("Token not provided", 401)
   }

   const [, token] = authorization.split(" ")

   try{
    const decoded = verify(token, process.env.JWT_SECRET!) as tokenPayload
    (req as any).userId = decoded.id;
    return next()

   }catch(error){
    throw new AppError("Invalid Token", 401)
   }
})