import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import { User } from "../../models/user.schema.js";

export class GetAllUser {
  static read = catchAsyncError(async (req, res, _next) => {

    const users = await User.find({})

    res.status(HTTP_STATUS.OK).json({
        success: true,
        users,
      });
  });
}
