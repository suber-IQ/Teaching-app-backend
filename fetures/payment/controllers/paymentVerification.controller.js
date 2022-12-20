import crypto from "crypto";
import { Payment } from "../models/payment.schema.js";
import catchAsyncError from "../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import { User } from "../../user/models/user.schema.js";

export class PaymentVerification {
  static read = catchAsyncError(async (req, res, next) => {
    const {
      razorpay_signature,
      razorpay_payment_id,
      razorpay_subscription_id,
    } = req.body;

    const user = await User.findById(req.user._id);

    const subscription_id = user.subscription.id;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(razorpay_payment_id + "|" + subscription_id , "utf-8").digest("hex");

      const isAuthentic = generated_signature === razorpay_signature;

      if(!isAuthentic) return res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`)

    //   database add 

    await Payment.create({
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subscription_id

    });

    user.subscription.status = "active"

    await user.save();

    res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?refrence=${razorpay_payment_id}`)
  });

  
}
