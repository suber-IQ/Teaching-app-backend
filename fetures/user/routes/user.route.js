import express from 'express';
import { authorizeAdmin, isAuthenticated } from '../../../shared/middlewares/auth.js';
import { GetMyProfile } from '../controllers/profile/getMyProfile.contoller.js';
import { Login } from '../controllers/auth/login.controller.js';
import { Logout } from '../controllers/auth/logout.controller.js';
import { SignUp } from '../controllers/auth/signup.controller.js';
import { ChangePassword } from '../controllers/profile/changePassword.controller.js';
import { UpdateProfile } from '../controllers/profile/updateProfile.controller.js';
import { UpdateProfilePicture } from '../controllers/profile/updateProfilePicture.controller.js';
import { ForgetPassword } from '../controllers/profile/forgetPassword.controller.js';
import { ResetPassword } from '../controllers/profile/resetPassword.controller.js';
import { AddToPlaylist } from '../controllers/profile/addToPlaylist.controller.js';
import { RemoveToPlaylist } from '../controllers/profile/removeToPlaylist.controller.js';
import singleUpload from '../../../shared/middlewares/multer.js';
import { GetAllUser } from '../controllers/admin/getAllUser.controller.js';
import { UpdateUserRole } from '../controllers/admin/updateUserRole.controller.js';
import { DeleteUser } from '../controllers/admin/deleteUser.controller.js';
import { DeleteMeProfile } from '../controllers/profile/deleteMyProfile.controller.js';

const userRouter = express.Router();

// Auth

userRouter.route("/register").post(singleUpload, SignUp.create)
userRouter.route("/login").post(Login.update)
userRouter.route("/logout").get(isAuthenticated, Logout.read)

// Profile

userRouter.route("/me").get(isAuthenticated, GetMyProfile.read)
userRouter.route("/me").delete(isAuthenticated, DeleteMeProfile.delete)
userRouter.route("/changepassword").put(isAuthenticated, ChangePassword.update)
userRouter.route("/updateprofile").put(isAuthenticated, UpdateProfile.update)
userRouter.route("/updateprofilepicture").put(isAuthenticated,singleUpload, UpdateProfilePicture.update)

// ForgetPassword user

userRouter.route("/forgetpassword").post(ForgetPassword.create)
userRouter.route("/resetpassword/:token").put(ResetPassword.update)

// Add and Remove Playlist

userRouter.route("/addtoplaylist").post(isAuthenticated,AddToPlaylist.create)
userRouter.route("/removeplaylist").delete(isAuthenticated,RemoveToPlaylist.update)

// Admin Routes
userRouter.route('/admin/users').get(isAuthenticated, authorizeAdmin, GetAllUser.read)
userRouter.route('/admin/user/:id').put(isAuthenticated, authorizeAdmin, UpdateUserRole.update).delete(isAuthenticated, authorizeAdmin,DeleteUser.delete)


export default userRouter;