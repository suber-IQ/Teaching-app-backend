import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncError from './catchAsyncErrorMiddleware.js';
import HTTP_STATUS from 'http-status-codes';
import { User } from '../../fetures/user/models/user.schema.js';


export const isAuthenticated = catchAsyncError(async (req,_res,next) => {
    const { token } =  req.cookies;

    if(!token) return next(new ErrorHandler("Not Logged In",HTTP_STATUS.UNAUTHORIZED))

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    next();
});

export const authorizeAdmin = (req,_res,next) => {
   if(req.user.role !== 'admin') return next(new ErrorHandler(`${req.user.role} is not allowed to access this resourse`,HTTP_STATUS.FORBIDDEN))
   next();
}

export const authorizeSubscribers = (req,_res,next) => {
   if(req.user.subscription.status !== 'active' && req.user.role !== "admin") return next(new ErrorHandler("Only Subscribers can access this resource",HTTP_STATUS.FORBIDDEN))
   next();
}