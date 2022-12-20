import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import cloudinary from 'cloudinary'
import getDataUri from "../../../../shared/utils/dataUri.js";
import { Course } from "../../models/course.schema.js";



export class DeleteCourse {
  static delete = catchAsyncError(async (req, res, next) => {
    const { id } = req.params

    const course = await Course.findById(id);
    if (!course)
      return next(new ErrorHandler("Course not found", HTTP_STATUS.NOT_FOUND));

      await cloudinary.v2.uploader.destroy(course.poster.public_id)
      
      for (let i = 0; i < course.lectures.length; i++) {
       const singleLecture = course.lectures[i];

      await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
        resource_type: "video"
      })
        
      }
      await course.remove();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Course Deleted Successfully...'
    });
  });
}
