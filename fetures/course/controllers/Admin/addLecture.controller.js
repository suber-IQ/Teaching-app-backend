import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import cloudinary from "cloudinary";
import getDataUri from "../../../../shared/utils/dataUri.js";
import { Course } from "../../models/course.schema.js";

export class AddLecture {
  static create = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const file = req.file;
    if (!title || !description || !file)
      return next(
        new ErrorHandler("All Field is required", HTTP_STATUS.BAD_REQUEST)
      );

    const course = await Course.findById(id);
    if (!course)
      return next(new ErrorHandler("Course not found", HTTP_STATUS.NOT_FOUND));

    const fileUrl = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
      resource_type: "video",
    });

    course.lectures.push({
      title,
      description,
      video: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });

    course.numOfVideos = course.lectures.length;

    await course.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Lecture added in Course",
    });
  });
}
