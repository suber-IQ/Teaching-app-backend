import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { sendEmail } from "../../../../shared/utils/sendEmail.js";
import { User } from "../../models/user.schema.js";

export class ForgetPassword {
  static create = catchAsyncError(async (req, res, next) => {
    const { email } = req.body

    const user = await User.findOne({email});

    if(!user) return next(new ErrorHandler("User not found",HTTP_STATUS.BAD_REQUEST));

    const resetToken = await user.getResetToken();

    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

    const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore`

    // Send token via email
    await sendEmail(user.email,"CourseBundler Reset Password", message)


    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Reset Token has been sent to ${user.email}`,
    });
  });
}
