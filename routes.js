import courseRouter from "./fetures/course/routes/course.routes.js";
import otherRouter from "./fetures/other/routes/other.routes.js";
import paymentRouter from "./fetures/payment/routes/payment.route.js";
import userRouter from "./fetures/user/routes/user.route.js";
const BASE_PATH = "/api/v1";

export default (app) => {
  const routes = () => {
    app.use(BASE_PATH, userRouter);
    app.use(BASE_PATH, courseRouter);
    app.use(BASE_PATH,paymentRouter);
    app.use(BASE_PATH,otherRouter);
  };
  routes();
};
