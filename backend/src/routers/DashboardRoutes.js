import { Router } from "express";
import {
  LoginAdmin,
  VerifyAdminToken,
  updateAdminCredential,
  PostMainData,
  PostLatestOrdersData,
  PostOrderDetailById,
  UpdateOrderStatus,
  PostProductsData,
  PostProductDataById,
  UpdateProduct,
  GenerateImgUrl,
  DropProductById,
  InsertProduct,
  PostRegisterUserData,
  PostRegisterUserById,
  PostRegisterUserOrders,
} from "../controllers/adminController.js";
import upload from "../controllers/MulterController.js";

const AdminRouter = Router();

//━━━━━━━━━━━━━━━━ other routes ━━━━━━━━━━━━━━━━ ★
AdminRouter.post("/getDashboardMainData", PostMainData);
AdminRouter.post("/generateImageUrl", upload.single("image"), GenerateImgUrl);
//━━━━━━━━━━━━━━━━ other routes ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ authentication routes ━━━━━━━━━━━━━━━━ ★
AdminRouter.post("/login", LoginAdmin);
AdminRouter.post("/verifyToken", VerifyAdminToken);
AdminRouter.post("/updateCredential", updateAdminCredential);
//━━━━━━━━━━━━━━━━ authentication routes ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ authentication routes ━━━━━━━━━━━━━━━━ ★
AdminRouter.post("/getDashboardLatestOrdersData", PostLatestOrdersData);
AdminRouter.post("/getDashboardOrdersDetailById", PostOrderDetailById);
AdminRouter.post("/updateOrderStatus", UpdateOrderStatus);
//━━━━━━━━━━━━━━━━ authentication routes ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ authentication routes ━━━━━━━━━━━━━━━━ ★
AdminRouter.post("/getDashboardProducts", PostProductsData);
AdminRouter.post("/getDashboardProductById", PostProductDataById);
AdminRouter.post("/updateDashboardProduct", UpdateProduct);
AdminRouter.post("/dropDashboardProductById", DropProductById);
AdminRouter.post("/insertDashboardProduct", InsertProduct);
//━━━━━━━━━━━━━━━━ authentication routes ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ Register User routes ━━━━━━━━━━━━━━━━ ★
AdminRouter.post("/getDashboardRegisterUserData", PostRegisterUserData);
AdminRouter.post("/getDashboardRegisterUserById", PostRegisterUserById);
AdminRouter.post("/getDashboardRegisterUsersOrders", PostRegisterUserOrders);
//━━━━━━━━━━━━━━━━ Register User routes ━━━━━━━━━━━━━━━━ ★

export default AdminRouter;
