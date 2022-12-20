import HTTP_STATUS from "http-status-codes";
import catchAsyncError  from "../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import { Course } from "../models/course.schema.js";

export class GetAllCoures {
  static read = catchAsyncError( async (req, res, next) => {

    const keyword = req.query.keyword || "";
    const category = req.query.category || "";

    const courses = await Course.find({
      title: {
        $regex: keyword,
        $options: "i"
      },
      category: {
        $regex: category,
        $options: "i"
      }
    }).select('-lectures');;

    res.status(HTTP_STATUS.OK).json({
      success: true,
      courses,
    });
  })
}
