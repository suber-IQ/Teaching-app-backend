import app from "./app.js";
import connectedDatabase from "./config/database.js";
import cloudinary from "cloudinary";
import RazorPay from "razorpay";
import nodeCorn from "node-cron";
import { Stats } from "./fetures/other/models/stats.Schema.js";
import catchAsyncError from "./shared/middlewares/catchAsyncErrorMiddleware.js";

const PORT = process.env.PORT || 5000;

// Connecteded Database
connectedDatabase(process.env.DATABASE_URL);

// Add Cloudinary

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

export const instance = new RazorPay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

nodeCorn.schedule(
  "0 0 0 1 * *",
  catchAsyncError(async () => {
    await Stats.create({});
  })
);

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
