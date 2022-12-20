import catchAsyncError from "../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import HTTP_STATUS from "http-status-codes";

export class GetRazorPayKey {
  static read = catchAsyncError(async (req, res, next) => {
    res.status(HTTP_STATUS.OK).json({
      success: true,
      key: process.env.RAZORPAY_API_KEY,
    });
  });
}
