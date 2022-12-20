import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { User } from "../../models/user.schema.js";
import cloudinary from "cloudinary";

export class DeleteMeProfile {
  static delete = catchAsyncError(async (req, res, _next) => {
    const user = await User.findById(req.user._id);
  
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    // Cancel Subscription

    await user.remove();

    res.status(HTTP_STATUS.OK).cookie("token",null,{
        expires: new Date(Date.now())
    }).json({
      success: true,
      message: "User Deleted Successfully...",
    });
  });
}
