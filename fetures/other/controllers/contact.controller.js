import catchAsyncError from "../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import HTTP_STATUS from "http-status-codes";
import ErrorHandler from "../../../shared/utils/errorHandler.js";
import { sendEmail } from "../../../shared/utils/sendEmail.js";


export class Contact{
    static create = catchAsyncError(async (req,res,next) => {
        const { name, email,message }= req.body;
        
        if(!name || !email || !message)
        return next(
          new ErrorHandler("All Field Required...", HTTP_STATUS.BAD_REQUEST)
        );

        const to = process.env.MY_EMAIL;
        const subject = "Contact from CourseBundler"
        const text = `I am ${name} and my Email is ${email}. \n ${message}`
        await sendEmail(to,subject,text);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Your Message has been Sent."
        })
  
    })
}