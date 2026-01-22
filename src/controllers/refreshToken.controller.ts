import { RequestHandler } from "express";
import { container } from "tsyringe";
import { catchAsync } from "../shared/utils/catchasync";
import { RefreshTokenService } from "../services/refreshToken.service";
import { AppError } from "../shared/errors/appError";

const refreshTokenService = container.resolve(RefreshTokenService);

export const refreshTokenController: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError("Refresh token not provided", 400);
  }

  const newAccessToken = await refreshTokenService.refresh(refreshToken);

  return res.json({
    accessToken: newAccessToken,
  });
});
