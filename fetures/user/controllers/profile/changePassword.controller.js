import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { User } from "../../models/user.schema.js";

export class ChangePassword {
  static update = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword} = req.body

    if(!oldPassword || !newPassword){
        return next(new ErrorHandler("please enter all field",HTTP_STATUS.BAD_REQUEST))
    }

    const user = await User.findById(req.user._id).select("+password")

    const isMatch = await user.comparePassword(oldPassword);

    if(!isMatch)
    return next(new ErrorHandler("Incorrect Old Password", HTTP_STATUS.BAD_REQUEST));

    user.password = newPassword;

    await user.save();
  

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Password Changed Successfully...",
      });
  });
}
