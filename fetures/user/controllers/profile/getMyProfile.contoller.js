import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import { User } from "../../models/user.schema.js";

export class GetMyProfile {
  static read = catchAsyncError(async (req, res, _next) => {

    const user = await User.findById(req.user._id)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        user,
      });
  });
}
