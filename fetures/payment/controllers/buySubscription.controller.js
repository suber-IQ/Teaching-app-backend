import HTTP_STATUS from "http-status-codes";
import { instance } from "../../../server.js";
import catchAsyncError from "../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import ErrorHandler from "../../../shared/utils/errorHandler.js";
import { User } from "../../user/models/user.schema.js";

export class BuySubscription {
  static create = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (user.role === "admin")
      return next(
        new ErrorHandler(
          "Admin can't buy subscription",
          HTTP_STATUS.BAD_REQUEST
        )
      );

    const plan_id = process.env.PLAN_ID;

    const subscription = await instance.subscriptions.create({
      plan_id,
      customer_notify: 1,
      total_count: 12,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      subscriptionId: subscription.id,
    });
  });
}
