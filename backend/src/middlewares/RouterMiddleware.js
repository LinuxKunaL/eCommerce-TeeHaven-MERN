import router from "../routers/PublicRoutes.js";
import AdminRouter from "../routers/DashboardRoutes.js";

const RouterMiddleware = (app) => {
  app.use("/api", router);
  app.use("/api/admin", AdminRouter);
};

export default RouterMiddleware;
