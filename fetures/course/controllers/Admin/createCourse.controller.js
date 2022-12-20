import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import getDataUri from "../../../../shared/utils/dataUri.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { Course } from "../../models/course.schema.js";
import cloudinary from "cloudinary";

export class CreateCourse {
  static create = catchAsyncError(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;
    const file = req.file;
    if (!title || !description || !category || !createdBy || !file)
      return next(
        new ErrorHandler("Please add all fields", HTTP_STATUS.BAD_REQUEST)
      );

    const fileUrl = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUrl.content);

     await Course.create({
      title,
      description,
      category,
      createdBy,
      poster: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Course Created Successfully...",
    });
  });
}
