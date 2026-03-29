import { RequestHandler } from "express";
import { container } from "tsyringe";
import { catchAsync } from "../shared/utils/catchasync";
import { RefreshTokenUseCase} from "../modules/auth/usecases/RefreshTokenUseCase/RefreshTokenUserUseCase";
import { AppError } from "../shared/errors/appError";


export const refreshTokenController: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError("Refresh token not provided", 400);
  }

  const useCase = container.resolve(RefreshTokenUseCase);
  const newAccessToken = await useCase.execute(refreshToken);

  return res.json({
    accessToken: newAccessToken,
  });
});
