import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { User } from "../../models/user.schema.js";

export class UpdateUserRole {
  static update = catchAsyncError(async (req, res, _next) => {
    const user = await User.findById(req.params.id);
    if (!user)
      return _next(new ErrorHandler("User not found", HTTP_STATUS.NOT_FOUND));
    if (user.role === "user") {
      user.role = "admin";
    } else {
      user.role = "user";
    }
    await user.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Role Updated",
    });
  });
}
