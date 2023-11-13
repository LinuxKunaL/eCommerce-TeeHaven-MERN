import { Router } from "express";
import {
  GetAllProducts,
  GetProductById,
  InsertProductReview,
  fetchProductReviews,
  signup,
  signIn,
  GenerateOtpAndPost,
  verifyEmailByOtp,
  CheckUserLogin,
  GetUserDetails,
  FetchOrderDataForUser,
  FetchOrderDataById,
  SetBillingAddress,
  SetAccountDetails,
  SetAccountPassword,
  PostImageRoute,
  PostInvoiceRoute,
  postIpAddress,
} from "../controllers/PublicApiController.js";
import {
  CreateOrder,
  GetOrderDetails,
} from "../controllers/RazorpayController.js";

const router = Router();

//━━━━━━━━━━━━━━━━ Product routes ━━━━━━━━━━━━━━━━ ★
router.post("/fetchShopProducts", GetAllProducts);
router.post("/fetchProductById", GetProductById);
//━━━━━━━━━━━━━━━━ Product routes ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ Product review routes ━━━━━━━━━━━━━━━━ ★
router.post("/postProductReview", InsertProductReview);
router.post("/fetchProductReviewById", fetchProductReviews);
//━━━━━━━━━━━━━━━━ Product review routes ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ authentication routes ━━━━━━━━━━━━━━━━ ★
router.post("/signup", signup);
router.post("/signIn", signIn);
router.post("/generateOtpForEmail", GenerateOtpAndPost);
router.post("/verifyGeneratedOtpForEmail", verifyEmailByOtp);
router.post("/checkToken", CheckUserLogin);
//━━━━━━━━━━━━━━━━ authentication routes ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ userProfile routes ━━━━━━━━━━━━━━━━ ★
router.post("/fetchUserDetails", GetUserDetails);
router.post("/fetchOrderDataForUser", FetchOrderDataForUser);
router.post("/fetchOrderDataById", FetchOrderDataById);
router.post("/setBillingAddressForUser", SetBillingAddress);
router.post("/setAccountDetailsForUser", SetAccountDetails);
router.post("/setAccountPasswordForUser", SetAccountPassword);
//━━━━━━━━━━━━━━━━ userProfile routes ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ paymentGateway routes ━━━━━━━━━━━━━━━━ ★
router.post("/createOrder", CreateOrder);
router.post("/postOrderDetails", GetOrderDetails);
//━━━━━━━━━━━━━━━━ paymentGateway routes ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ other routes ━━━━━━━━━━━━━━━━ ★
router.post("/postIpAddress", postIpAddress);
router.get("/productsImage/:imageName", PostImageRoute);
router.get("/invoice/:invoiceId", PostInvoiceRoute);
//━━━━━━━━━━━━━━━━ other routes ━━━━━━━━━━━━━━━━ ★

export default router;
