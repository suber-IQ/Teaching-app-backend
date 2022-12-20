import catchAsyncError from "../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import HTTP_STATUS from "http-status-codes";
import { sendEmail } from "../../../shared/utils/sendEmail.js";


export class Request{
    static create = catchAsyncError(async (req,res,next) => {
        const { name, email, course } = req.body;
        
        if(!name || !email || !course)
        return next(
          new ErrorHandler("All Field Required...", HTTP_STATUS.BAD_REQUEST)
        );

        const to = process.env.MY_EMAIL;
        const subject = "Requesting for a course on CourseBundler"
        const text = `I am ${name} and my Email is ${email}. \n ${course}`
        await sendEmail(to,subject,text);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Your Request has been Sent."
        })
    })
}