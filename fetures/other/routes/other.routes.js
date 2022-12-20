import express from 'express';
import { authorizeAdmin, isAuthenticated } from '../../../shared/middlewares/auth.js';
import { Contact } from '../controllers/contact.controller.js';
import { GetDashboardStats } from '../controllers/getDashboardStats.controller.js';
import { Request } from '../controllers/request.controller.js';

const otherRouter = express.Router();

// Contact form
otherRouter.route("/contact").post(Contact.create)

// Request form
otherRouter.route("/courserequest").post(Request.create)

// Get Admin Dashboard Stats
otherRouter.route("/admin/stats").get(isAuthenticated,authorizeAdmin,GetDashboardStats.read)

export default otherRouter;