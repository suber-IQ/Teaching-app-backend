import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import { User } from "../../models/user.schema.js";

export class UpdateProfile {
  static update = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Profile Updated Successfully...",
    });
  });
}
