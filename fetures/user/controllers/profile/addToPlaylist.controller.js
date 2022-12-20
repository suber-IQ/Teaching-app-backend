import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { Course } from "../../../course/models/course.schema.js";
import { User } from "../../models/user.schema.js";

export class AddToPlaylist {
    
  static create = catchAsyncError(async (req, res, next) => {

   const user = await User.findById(req.user._id);
   const course = await Course.findById(req.body.id);
   if(!course) return next(new ErrorHandler("Invaid Course Id",HTTP_STATUS.NOT_FOUND));

   const itemExist = user.playlist.find((item) => {
    if(item.course.toString() === course._id.toString()) return true;
   });
   if(itemExist) return next(new ErrorHandler("Item Already Exist", HTTP_STATUS.CONFLICT));

   user.playlist.push({
    course: course._id,
    poster: course.poster.url
   })

    await user.save();
  

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "AddToPlaylist Successfully...",
      });
  });
}
