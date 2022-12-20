import express from 'express';
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from '../../../shared/middlewares/auth.js';
import singleUpload from '../../../shared/middlewares/multer.js';
import { AddLecture } from '../controllers/Admin/addLecture.controller.js';
import { CreateCourse } from '../controllers/Admin/createCourse.controller.js';
import { DeleteCourse } from '../controllers/Admin/deletCourse.controller.js';
import { DeleteLecture } from '../controllers/Admin/deleteLecture.controller.js';
import { GetAllCoures } from '../controllers/getAllCoures.controller.controller.js';
import { GetCourseLectures } from '../controllers/getCourseLectures.controller.js';

const courseRouter = express.Router();


courseRouter.route('/courses').get(GetAllCoures.read);
courseRouter.route('/createcourse').post(isAuthenticated, authorizeAdmin,singleUpload, CreateCourse.create);

// Add Lecture, Delete Course, Get Course Details
courseRouter.route('/course/:id').get(isAuthenticated, authorizeSubscribers,GetCourseLectures.read).post(isAuthenticated,authorizeAdmin, singleUpload, AddLecture.create).delete(isAuthenticated,authorizeAdmin, DeleteCourse.delete);

// Delete lecture
courseRouter.route('/lecture').delete(isAuthenticated,authorizeAdmin, DeleteLecture.delete)


export default courseRouter;