import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { User } from "../../models/user.schema.js";
import cloudinary from "cloudinary";

export class DeleteUser {
  static delete = catchAsyncError(async (req, res, _next) => {
    const user = await User.findById(req.params.id);
    if (!user)
      return _next(new ErrorHandler("User not found", HTTP_STATUS.NOT_FOUND));

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    // Cancel Subscription

    await user.remove();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "User Deleted Successfully...",
    });
  });
}
