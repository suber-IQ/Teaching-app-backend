import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import cloudinary from 'cloudinary'
import getDataUri from "../../../../shared/utils/dataUri.js";
import { Course } from "../../models/course.schema.js";



export class DeleteLecture {
  static delete = catchAsyncError(async (req, res, next) => {
    const { courseId, lectureId } = req.query

    const course = await Course.findById(courseId);
    if (!course)
      return next(new ErrorHandler("Course not found", HTTP_STATUS.NOT_FOUND));

      const lecture = course.lectures.find(item => {
        if(item._id.toString() === lectureId.toString()) return item
      });

      
     await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
        resource_type: "video"
     });
      course.lectures = course.lectures.filter(item => {
        if(item._id.toString() !== lectureId.toString()) return item
      });
     course.numOfVideos = course.lectures.length

     await course.save();

  
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Lecture Deleted Successfully...'
    });
  });
}
