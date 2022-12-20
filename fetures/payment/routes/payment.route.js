import express from 'express';
import { isAuthenticated } from '../../../shared/middlewares/auth.js';
import { BuySubscription } from '../controllers/buySubscription.controller.js';
import { CancelSubscription } from '../controllers/cancelSubscription.controller.js';
import { GetRazorPayKey } from '../controllers/getRazorPayKey.controller.js';
import { PaymentVerification } from '../controllers/paymentVerification.controller.js';

const paymentRouter = express.Router();

// Buy Subscription
paymentRouter.route("/subscribe").get(isAuthenticated,BuySubscription.create)
// Verify Payment and save reference in database
paymentRouter.route("/paymentverification").post(isAuthenticated,PaymentVerification.read)
// Get Razorpay key
paymentRouter.route("/razorpaykey").get(isAuthenticated,GetRazorPayKey.read)
// Cancel Subscription
paymentRouter.route("/subscribe/cancel").delete(isAuthenticated,CancelSubscription.delete)



export default paymentRouter;