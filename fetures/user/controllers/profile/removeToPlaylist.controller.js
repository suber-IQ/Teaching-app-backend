import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { Course } from "../../../course/models/course.schema.js";
import { User } from "../../models/user.schema.js";

export class RemoveToPlaylist {
  static update = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.query.id);
    if (!course)
      return next(new ErrorHandler("Invaid Course Id", HTTP_STATUS.NOT_FOUND));

    const newPlaylist = user.playlist.filter((item) => {
      if (item.course.toString() !== course._id.toString()) return item;
    });

    user.playlist = newPlaylist;

    await user.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Removed From Playlist",
    });
  });
}
