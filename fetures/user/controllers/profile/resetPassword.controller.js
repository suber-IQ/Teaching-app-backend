import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { User } from "../../models/user.schema.js";
import crypto from 'crypto';

export class ResetPassword {
  static update = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now(),
        }
    });
    if(!user) return next(new ErrorHandler("Token is invalid or has been expired"))

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
   

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Password Change Successfully...",
    });
  });
}
