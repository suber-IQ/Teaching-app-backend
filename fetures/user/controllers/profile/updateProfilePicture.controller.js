import HTTP_STATUS from "http-status-codes";
import catchAsyncError from "../../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import getDataUri from "../../../../shared/utils/dataUri.js";
import { User } from "../../models/user.schema.js";
import cloudinary from 'cloudinary';


export class UpdateProfilePicture {
  static update = catchAsyncError(async (req, res, next) => {
    
    const file = req.file
    const user = await User.findById(req.user._id);
 
    // Cloudanary addedd..
   
    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    user.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url
    }
    await user.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Profile Picture Updated Successfully...",
    });
  });
}
