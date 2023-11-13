import DashboardMongoQuery from "../../database/MongoDashboard.js";
import config from "../../config/index.js";
import jwt from "jsonwebtoken";
import { GetRevenue } from "./RazorpayController.js";

const dashboardMongoDB = new DashboardMongoQuery();

const verifyJwtToken = (Token) => {
  const DecodedToken = jwt.verify(Token, config.Jwt.secretKey);
  return DecodedToken.id;
};

//━━━━━━━━━━━━━━━━ other controllers ━━━━━━━━━━━━━━━━ ★

export const GenerateImgUrl = async (req, res) => {
  res.status(200).send({
    ImageUrl: `${config.Server.webUrl}/api/productsImage/${req.file.filename}`,
  });
};

export const PostMainData = async (req, res) => {
  const ClientToken = req.body.ClientToken;
  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const TotalRevenue = await GetRevenue();
      const AppStatistic = await dashboardMongoDB.AppStatistic();
      return res.status(200).json({
        Revenue: TotalRevenue,
        ...AppStatistic,
      });
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(404).send("invalid token");
  }
};

//━━━━━━━━━━━━━━━━ other controllers ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ authentication controllers ━━━━━━━━━━━━━━━━ ★

export const LoginAdmin = async (req, res) => {
  const Data = req.body.FormData;
  const result = await dashboardMongoDB
    .adminLogin("adminData", Data)
    .catch((Error) => {
      console.log(Error + " LoginAdmin in adminController");
    });

  if (result != null) {
    const token = jwt.sign({ id: result._id }, config.Jwt.secretKey);
    res.status(200).send({
      massage: "login are successful !",
      Status: 200,
      token: token,
    });
  } else {
    res.status(200).send({
      massage: "you credential is wrong !",
      Status: 404,
    });
  }
};

export const VerifyAdminToken = async (req, res) => {
  const ClientToken = req.body.ClientToken;
  if (ClientToken != null) {
    try {
      const AdminId = verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .adminLogin("adminData", AdminId)
        .catch((Error) => {
          console.log(Error + " VerifyAdminToken in adminController");
        });
      if (result != null) {
        return res.status(200).send({
          verify: true,
        });
      } else {
        return res.status(200).send({
          verify: false,
        });
      }
    } catch (error) {
      return res.status(200).send({
        verify: false,
      });
    }
  } else {
    return res.status(200).send({
      verify: false,
    });
  }
};

export const updateAdminCredential = async (req, res) => {
  const RequestBody = req.body.newCredential;
  const ClientToken = req.body.ClientToken;

  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .updateCredential("adminData", RequestBody)
        .catch((Error) => {
          console.log(Error + " updateAdminCredential in adminController");
        });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(404).send("invalid token");
    }
  } else {
    return res.status(404).send("invalid token");
  }
};

//━━━━━━━━━━━━━━━━ authentication controllers ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ orders controllers ━━━━━━━━━━━━━━━━ ★

export const PostLatestOrdersData = async (req, res) => {
  const ClientToken = req.body.ClientToken;
  const RequestParams = req.body.param;

  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .fetchLatestOrder("productsOrders", RequestParams)
        .catch((Error) => {
          console.log(Error + " PostLatestOrdersData in adminController");
        });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(404).send("invalid token");
    }
  } else {
    return res.status(404).send("invalid token");
  }
};

export const PostOrderDetailById = async (req, res) => {
  const ClientToken = req.body.ClientToken;
  const OrderId = req.body.OrderId;
  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .fetchOrderById("productsOrders", OrderId)
        .catch((Error) => {
          console.log(Error + " PostOrderDetailById in PublicApiController");
        });
      return res.send(result);
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }
};

export const UpdateOrderStatus = async (req, res) => {
  const updatedData = req.body.updatedData;
  const ClientToken = req.body.ClientToken;

  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .updateOrderStatus("productsOrders", updatedData)
        .catch((Error) => {
          console.log(Error + " UpdateOrderStatus in PublicApiController");
        });
      if (result != null) {
        return res.send(result);
      }
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }
};

//━━━━━━━━━━━━━━━━ orders controllers ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ Products controllers ━━━━━━━━━━━━━━━━ ★

export const PostProductsData = async (req, res) => {
  const ClientToken = req.body.ClientToken;
  const requestParam = req.body.param;

  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .fetchProducts("products", requestParam)
        .catch((Error) => {
          console.log(Error + " PostProductsData in PublicApiController");
        });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }

  try {
  } catch (error) {
    res.send({
      message: "your product id is wrong !",
    });
  }
};

export const PostProductDataById = async (req, res) => {
  const ProductId = req.body.id;
  const ClientToken = req.body.ClientToken;

  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .fetchProductById("products", ProductId)
        .catch((Error) => {
          console.log(Error + " PostProductDataById in PublicApiController");
        });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }
};

export const UpdateProduct = async (req, res) => {
  const ClientToken = req.body.ClientToken;
  const UpdatedProduct = req.body.UpdatedProduct;

  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .updateProduct("products", UpdatedProduct)
        .catch((Error) => {
          console.log(Error + " UpdateProduct in PublicApiController");
        });
      return res.status(200).send({
        ModifiedCount: result.modifiedCount,
      });
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }
};

export const DropProductById = async (req, res) => {
  const ClientToken = req.body.ClientToken;
  const ProductId = req.body.id;

  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .dropProductById("products", ProductId)
        .catch((Error) => {
          console.log(Error + " DropProductById in PublicApiController");
        });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }
};

export const InsertProduct = async (req, res) => {
  const RequestBody = req.body.ProductData;
  const ClientToken = req.body.ClientToken;

  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .insertProduct("products", RequestBody)
        .catch((Error) => {
          console.log(Error + " InsertProduct in PublicApiController");
        });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }
};

//━━━━━━━━━━━━━━━━ Products controllers ━━━━━━━━━━━━━━━━ ★

//━━━━━━━━━━━━━━━━ Register User controllers ━━━━━━━━━━━━━━━━ ★

export const PostRegisterUserData = async (req, res) => {
  const RequestBody = req.body.param;
  const ClientToken = req.body.ClientToken;
  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .fetchRegisterUser("loginUserData", RequestBody)
        .catch((Error) => {
          console.log(Error + " PostRegisterUserData in PublicApiController");
        });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }
};

export const PostRegisterUserById = async (req, res) => {
  const UserId = req.body.id;
  const ClientToken = req.body.ClientToken;

  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .fetchRegisterUserById("loginUserData", UserId)
        .catch((Error) => {
          console.log(Error + " PostRegisterUserById in PublicApiController");
        });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }
};

export const PostRegisterUserOrders = async (req, res) => {
  const UserId = req.body.userId;
  const ClientToken = req.body.ClientToken;
  if (ClientToken != null) {
    try {
      verifyJwtToken(ClientToken);
      const result = await dashboardMongoDB
        .fetchRegisterUserOrder("productsOrders", UserId)
        .catch((Error) => {
          console.log(Error + " PostRegisterUserOrders in PublicApiController");
        });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(200).send("invalid token");
    }
  } else {
    return res.status(200).send("invalid token");
  }
};
//━━━━━━━━━━━━━━━━ Register User controllers ━━━━━━━━━━━━━━━━ ★
