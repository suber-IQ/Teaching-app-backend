import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import { Course } from "../models/course.schema.js";
import ErrorHandler from "../../../shared/utils/errorHandler.js";

export class GetCourseLectures {
  static read = catchAsyncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course)
      return next(new ErrorHandler("Course not found", HTTP_STATUS.NOT_FOUND));
      
      course.views += 1
      await course.save();


    res.status(HTTP_STATUS.OK).json({
      success: true,
      lectures: course.lectures,
    });
  });
}
