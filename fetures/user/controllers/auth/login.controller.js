import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { sendToken } from "../../../../shared/utils/sendToken.js";
import { User } from "../../models/user.schema.js";

export class Login {
  static update = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // upload files

    if(!email || !password)
      return next(
        new ErrorHandler("All Field Required...", HTTP_STATUS.BAD_REQUEST)
      );

    const user = await User.findOne({ email }).select("+password");

    if(!user)
      return next(new ErrorHandler("User Doesn't Exist", HTTP_STATUS.UNAUTHORIZED));

  const isMatch = await user.comparePassword(password);

  if(!isMatch)
  return next(new ErrorHandler("Incorrect Email or Password", HTTP_STATUS.UNAUTHORIZED));

    const tokenData = {
      res,
      user,
      message: `Welcome back ${user.name}`,
      statusCode: HTTP_STATUS.OK,
    };

    sendToken(tokenData);
  });
}
