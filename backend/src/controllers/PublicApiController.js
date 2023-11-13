import PublicMongoQuery from "../../database/MongoPublic.js";
import DashboardMongoQuery from "../../database/MongoDashboard.js";
import config from "../../config/index.js";
import { sendGoogleMail } from "./emailSendController.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicMongoDB = new PublicMongoQuery();
publicMongoDB.connect();

const verifyJwtToken = (Token) => {
  try {
    const DecodedToken = jwt.verify(Token, config.Jwt.secretKey);
    return DecodedToken.UserId;
  } catch (error) {
    console.log(error + " in verifyJwtToken (jwt)");
  }
};

//━━━━━━━━━━━━━━━━ Product controllers ━━━━━━━━━━━━━━━━ ★

export const GetAllProducts = async (req, res) => {
  const RequestBody = req.body;
  const result = await publicMongoDB
    .fetchProducts("products", RequestBody)
    .catch((Error) => {
      console.log(Error + " GetAllProducts in PublicApiController");
    });
  return res.status(200).send(result);
};
export const GetProductById = async (req, res) => {
  const RequestBody = req.body.id;
  const result = await publicMongoDB
    .fetchProductsById("products", RequestBody)
    .catch((Error) => {
      console.log(Error + " GetProductById in PublicApiController");
    });
  return res.status(200).send(result);
};

//━━━━━━━━━━━━━━━━ Product controllers ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ ProductReviews controllers ━━━━━━━━━━━━━━━━ ★

export const fetchProductReviews = async (req, res) => {
  const RequestBody = req.body.ProductId;
  const result = await publicMongoDB
    .fetchProductReviewById("productsReviews", RequestBody)
    .catch((Error) => {
      console.log(Error + " fetchProductReviews in PublicApiController");
    });
  return res.status(200).send(result);
};

export const InsertProductReview = async (req, res) => {
  const ProductId = req.body.ProductId;
  const Review = req.body.Review;
  const userId = verifyJwtToken(req.body.token);

  await publicMongoDB
    .insertProductReview({ ProductId, Review, userId })
    .catch((Error) => {
      console.log(Error + " InsertProductReview in PublicApiController");
    });
  return res.status(200).send({
    message: "Review are posted !",
  });
};
//━━━━━━━━━━━━━━━━ ProductReviews controllers ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ authentication controllers ━━━━━━━━━━━━━━━━ ★

export const signup = async (req, res) => {
  const RequestBody = req.body;

  const DefaultFelid = {
    billingAddress: {
      streetAddress: "",
      townCity: "",
      state: "",
      pinCode: "",
    },
    AccountCreated: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    AccountType: "email",
  };

  const RegisterUserData = { ...DefaultFelid, ...RequestBody };

  await publicMongoDB
    .insertFormData("loginUserData", RegisterUserData)
    .catch((Error) => {
      console.log(Error + " signup in PublicApiController");
    });
  return res.status(200).send("Account Created !");
};

export const signIn = async (req, res) => {
  const RequestBody = req.body.fromData;

  const result = await publicMongoDB
    .signIn("loginUserData", {
      Email: RequestBody.Email,
      Password: RequestBody.Password,
    })
    .catch((Error) => {
      console.log(Error + " signIn in PublicApiController");
    });

  if (result != null) {
    const UserId = result._id;
    const Token = jwt.sign({ UserId }, config.Jwt.secretKey);
    return res.status(200).json({
      Result: "login successful !",
      Status: 200,
      Token: Token,
    });
  } else {
    return res.status(200).json({
      Result: "your credentials is wrong !",
      Status: 404,
    });
  }
};

export const GenerateOtpAndPost = async (req, res) => {
  var randomOtp6Digit = "";
  var RequestBody = req.body;

  for (let i = 0; i < 6; i++) {
    randomOtp6Digit += Math.floor(Math.random() * 10);
  }
  const result = await publicMongoDB
    .checkEmailIsExits("loginUserData", RequestBody.email)
    .catch((Error) => {
      console.log(Error + " GenerateOtpAndPost in PublicApiController");
    });

  if (result != null) {
    return res.status(404).send("Email is already exist !");
    // res.send({
    //   error: ,
    // });
  }
  const EmailAndOtp = {
    email: RequestBody.email,
    otp: randomOtp6Digit,
  };
  try {
    await publicMongoDB
      .insertOtpForEmail("EmailOtp", EmailAndOtp)
      .catch((Error) => {
        console.log(Error + " in PublicApiController");
      });
    sendGoogleMail(RequestBody.email, randomOtp6Digit);
    return res.status(200).send("Otp send Successful !");
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmailByOtp = async (req, res) => {
  const EmailAndOtp = {
    email: req.body.email,
    otp: req.body.otp,
  };
  const result = await publicMongoDB
    .verifyOtp("EmailOtp", EmailAndOtp)
    .catch((Error) => {
      console.log(Error + " verifyEmailByOtp in PublicApiController");
    });
  return res.status(200).send(result);
};

export const CheckUserLogin = async (req, res) => {
  const Token = req.body.ClientToken;
  var DecodeToken;

  try {
    DecodeToken = jwt.verify(Token, config.Jwt.secretKey);
  } catch (error) {
    console.log(error + " in CheckUserLogin (jwt)");
    return res.send(error);
  }

  const result = await publicMongoDB
    .verifyUserByJwt("loginUserData", {
      id: DecodeToken.UserId,
    })
    .catch((Error) => {
      console.log(Error + " CheckUserLogin in PublicApiController");
    });

  if (result != null) {
    return res.status(200).send({
      userCheck: true,
    });
  } else {
    return res.status(200).send({
      userCheck: false,
    });
  }
};

//━━━━━━━━━━━━━━━━ authentication controllers ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ userProfile controllers ━━━━━━━━━━━━━━━━ ★

export const GetUserDetails = async (req, res) => {
  const userId = verifyJwtToken(req.body.ClientToken);
  try {
    var result = await publicMongoDB.fetchUserDetailsById(
      "loginUserData",
      userId
    );
    return res.status(200).send(result);
  } catch (error) {
    console.log(error + "in GetUserDetails PublicApiController");
  }
};

export const SetBillingAddress = async (req, res) => {
  const RequestData = req.body;
  const userId = verifyJwtToken(RequestData.ClientToken);

  const result = await publicMongoDB
    .insertUserBillingAddress("loginUserData", {
      userId,
      billingAddress: RequestData.billingAddress,
    })
    .catch((Error) => {
      console.log(Error + " SetBillingAddress in PublicApiController");
    });
  return res.status(200).send(result);
};

export const SetAccountDetails = async (req, res) => {
  const RequestData = req.body;
  const userId = verifyJwtToken(RequestData.ClientToken);

  const result = await publicMongoDB
    .UpdateUserAccountDetails("loginUserData", {
      userId,
      FullName: RequestData.UpdatedUserData.FullName,
      PhoneNum: RequestData.UpdatedUserData.PhoneNumber,
    })
    .catch((Error) => {
      console.log(Error + " SetAccountDetails in PublicApiController");
    });
  return res.status(200).send(result);
};

export const SetAccountPassword = async (req, res) => {
  const RequestData = req.body;
  const userId = verifyJwtToken(RequestData.ClientToken);

  const result = await publicMongoDB
    .UpdateUserAccountPassword("loginUserData", {
      userId,
      UpdatedUserPassword: RequestData.UpdatedUserPassword,
    })
    .catch((Error) => {
      console.log(Error + " SetAccountPassword in PublicApiController");
    });
  res.status(200).send(result);
};

export const FetchOrderDataForUser = async (req, res) => {
  const RequestData = req.body;
  const userId = verifyJwtToken(RequestData.ClientToken);
  const isDeliver = req.body.isDeliver;

  const result = await publicMongoDB
    .fetchOrdersForUser("productsOrders", {
      userId,
      isDeliver,
    })
    .catch((Error) => {
      console.log(Error + " FetchOrderDataForUser in PublicApiController");
    });
  res.status(200).send(result);
};

export const FetchOrderDataById = async (req, res) => {
  const orderId = req.body.orderId;

  const result = await publicMongoDB
    .fetchOtherByIdForUser("productsOrders", orderId)
    .catch((Error) => {
      console.log(Error + " FetchOrderDataById in PublicApiController");
    });
  res.status(200).send(result);
};

//━━━━━━━━━━━━━━━━ userProfile controllers ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ other controllers ━━━━━━━━━━━━━━━━ ★

export const PostImageRoute = (req, res) => {
  const imagePath = path.join(
    __dirname,
    `../../uploads/productsImages/${req.params.imageName}`
  );
  const readStream = fs.createReadStream(imagePath);

  readStream.on("error", (error) => {
    res.status(500).send("image not found");
  });

  readStream.pipe(res);
};

export const PostInvoiceRoute = (req, res) => {
  const invoicePdfPath = path.join(
    __dirname,
    `../../uploads/invoices/${req.params.invoiceId}`
  );
  const readStream = fs.createReadStream(invoicePdfPath);

  readStream.on("error", (error) => {
    res.status(500).send("invoice not found");
  });

  readStream.pipe(res);
};

export const postIpAddress = async (req, res) => {
  const IpAddress = req.body.ip;
  const result = await publicMongoDB
    .insertIpForVisitor("visitor", IpAddress)
    .catch((Error) => {
      console.log(Error + " postIpAddress in PublicApiController");
    });
  res.status(200).send(result);
};

//━━━━━━━━━━━━━━━━ other controllers ━━━━━━━━━━━━━━━━ ★
