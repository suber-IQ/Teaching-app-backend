import catchAsyncError from "../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import HTTP_STATUS from "http-status-codes";
import { User } from "../../user/models/user.schema.js";
import { instance } from "../../../server.js";
import { Payment } from "../models/payment.schema.js";

export class CancelSubscription {
  static delete = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    const subscriptionId = user.subscription.id;
    let refund = false;
    await instance.subscriptions.cancel(subscriptionId);
    const payment = await Payment.findOne({
      razorpay_subscription_id: subscriptionId,
    });
    const gap = Date.now() - payment.createdAt;

    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

    if (refundTime > gap) {
    //   await instance.payments.refund(payment.razorpay_payment_id);
      refund = true;
    }

    await payment.remove();
    user.subscription.id = undefined;
    user.subscription.status = undefined;
    await user.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: refund
        ? "Subscription cancelled, You will recieve full refund within 7 days"
        : "Subscription cancelled,Now refund initiad as subscription was cancelled after 7 days.",
    });
  });
}
