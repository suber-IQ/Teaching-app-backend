import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";

export class Logout {
  static read = catchAsyncError(async (_req, res, _next) => {
    res
      .status(HTTP_STATUS.OK)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none" 
      })
      .json({
        success: true,
        message: "Logged Out Successfully....",
      });
  });
}
