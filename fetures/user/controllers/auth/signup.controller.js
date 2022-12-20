import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import getDataUri from "../../../../shared/utils/dataUri.js";
import ErrorHandler from "../../../../shared/utils/errorHandler.js";
import { sendToken } from "../../../../shared/utils/sendToken.js";
import { User } from "../../models/user.schema.js";
import cloudinary from 'cloudinary';

export class SignUp {
  static create = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const file = req.file
    
    if (!name || !email || !password || !file)
    return next(
      new ErrorHandler("All Field Required...", HTTP_STATUS.BAD_REQUEST)
      );
      
      let user = await User.findOne({ email });
      
      if (user)
      return next(new ErrorHandler("User Already Exits", HTTP_STATUS.CONFLICT));


      const fileUri = getDataUri(file);

      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)


    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });
    const tokenData = {
      res,
      user,
      message: "Registered Successfully...",
      statusCode: HTTP_STATUS.CREATED,
    };

    sendToken(tokenData);
  });
}
