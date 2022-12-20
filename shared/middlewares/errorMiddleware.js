import HTTP_STATUS from "http-status-codes";


const ErrorMiddleware = (err,req,res,next) => {
     err.statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
     err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export default ErrorMiddleware