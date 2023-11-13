import { MongoClient, ObjectId } from "mongodb";
import config from "../config/index.js";

export default class PublicMongoQuery {
  constructor() {
    this.client = new MongoClient(config.Database.url);
    this.Cursor = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(config.Database.db);
      console.log("MongoClient is Connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  //━━━━━━━━━━━━━━━━  products Operations ━━━━━━━━━━━━━━━━ ★

  async fetchProducts(collection, value) {
    const collections = this.db.collection(collection);
    const PageNumber = parseInt(value.param.page);
    const PerPageLimit = parseInt(value.param.limit);
    const SkipProduct = (PageNumber - 1) * PerPageLimit;
    const ProductCount = await collections.countDocuments({
      title: { $regex: new RegExp(value.param.searchQuery, "i") },
      productactivate: true,
      category: {
        $regex: new RegExp(
          value.param.category != "all" ? value.param.category : "",
          "i"
        ),
      },
    });
    const FilterProducts = await collections
      .find({
        title: { $regex: new RegExp(value.param.searchQuery, "i") },
        productactivate: true,
        category: {
          $regex: new RegExp(
            value.param.category != "all" ? value.param.category : "",
            "i"
          ),
        },
      })
      .skip(SkipProduct)
      .limit(PerPageLimit)
      .toArray();

    return {
      productCount: ProductCount,
      pageNumber: PageNumber,
      products: FilterProducts,
    };
  }

  async fetchProductsById(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections.findOne({
      _id: new ObjectId(value),
      productactivate: true,
    });
    return this.Cursor;
  }

  async fetchProductReviewById(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections
      .find({
        productId: value,
      })
      .toArray();
    return this.Cursor;
  }

  async insertProductReview(value) {
    const userDataCollection = await this.db
      .collection("loginUserData")
      .findOne(
        {
          _id: new ObjectId(value.userId),
        },
        {
          projection: {
            _id: 0,
            FullName: 1,
          },
        }
      );

    this.Cursor = await this.db.collection("productsReviews").insertOne({
      userName: userDataCollection.FullName,
      productId: value.ProductId,
      review: value.Review,
    });

    return this.Cursor;
  }

  //━━━━━━━━━━━━━━━━  products Operations ━━━━━━━━━━━━━━━━ ★

  //━━━━━━━━━━━━━━━━  authentication Operations ━━━━━━━━━━━━━━━━ ★

  async insertFormData(collection, value) {
    const collections = this.db.collection(collection);
    try {
      this.Cursor = await collections.insertOne({
        FullName: value.FullName,
        PhoneNum: value.PhoneNum,
        Email: value.Email,
        Password: value.Password,
        billingAddress: value.billingAddress,
        AccountCreated: value.AccountCreated,
        AccountType: value.AccountType,
      });
    } catch (Error) {
      this.Cursor = Error;
    }
  }

  async insertOtpForEmail(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections.insertOne({
      Email: value.email,
      Otp: value.otp,
    });
    return this.Cursor;
  }

  async checkEmailIsExits(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections.findOne({
      Email: value,
    });
    return this.Cursor;
  }

  async verifyOtp(collection, value) {
    const collections = this.db.collection(collection);
    const IsExist = await collections.findOne({
      Email: value.email,
      Otp: value.otp,
    });
    if (IsExist != null) {
      await collections.deleteOne({
        Email: value.email,
      });
      this.Cursor = {
        status: true,
        message: "otp verify successful !",
      };
    } else {
      this.Cursor = {
        status: false,
        message: "otp is not match !",
      };
    }
    return this.Cursor;
  }

  async signIn(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections.findOne({
      Email: value.Email,
      Password: value.Password,
    });
    return this.Cursor;
  }

  async verifyUserByJwt(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections.findOne({
      _id: new ObjectId(value.id),
    });
    return this.Cursor;
  }

  //━━━━━━━━━━━━━━━━  authentication Operations ━━━━━━━━━━━━━━━━ ★

  //━━━━━━━━━━━━━━━━  userProfile Operations ━━━━━━━━━━━━━━━━ ★

  async fetchUserDetailsById(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections.findOne(
      { _id: new ObjectId(value) },
      { projection: { Password: 0 } }
    );
    return this.Cursor;
  }

  async insertUserBillingAddress(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections.updateOne(
      { _id: new ObjectId(value.userId) },
      {
        $set: {
          billingAddress: value.billingAddress,
        },
      }
    );
    return this.Cursor;
  }

  async UpdateUserAccountDetails(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections
      .updateOne(
        { _id: new ObjectId(value.userId) },
        {
          $set: {
            FullName: value.FullName,
            PhoneNum: value.PhoneNum,
          },
        }
      )
      .catch((error) => (this.Cursor = error));
    return this.Cursor;
  }

  async UpdateUserAccountPassword(collection, value) {
    const collections = this.db.collection(collection);

    console.log(value);
    this.Cursor = await collections.updateOne(
      { _id: new ObjectId(value.userId) },
      {
        $set: {
          Password: value.UpdatedUserPassword,
        },
      }
    );
    return this.Cursor;
  }

  async fetchOrdersForUser(collection, value) {
    const collections = this.db.collection(collection);

    const projection = {
      pickUp: 1,
      arrived: 1,
      orderTotalPrice: 1,
      orderedProducts: 1,
      deliveredOrNot: 1,
    };
    this.Cursor = await collections
      .find(
        {
          userId: value.userId,
          deliveredOrNot: value.isDeliver,
        },
        { projection }
      )
      .toArray();
    return this.Cursor;
  }

  async fetchOtherByIdForUser(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections.findOne({
      _id: new ObjectId(value),
    });
    return this.Cursor;
  }

  //━━━━━━━━━━━━━━━━  userProfile Operations ━━━━━━━━━━━━━━━━ ★

  //━━━━━━━━━━━━━━━━  other Operations ━━━━━━━━━━━━━━━━ ★

  async insertIpForVisitor(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections
      .insertOne({
        IpAddress: value,
      })
      .catch((error) => {
        return null; // this code return "duplicate key error collection"
      });
    return this.Cursor;
  }

  //━━━━━━━━━━━━━━━━  other Operations ━━━━━━━━━━━━━━━━ ★

  //━━━━━━━━━━━━━━━━  other Operations ━━━━━━━━━━━━━━━━ ★

  async insertOrderedDetails(collection, value) {
    const collections = this.db.collection(collection);
    this.Cursor = await collections.insertOne({
      userId: value.RequestBody.orderData[0].userId,
      razorpayPaymentId: value.RequestBody.orderData[0].razorpay_payment_id,
      razorpayOrderId: value.RequestBody.orderData[0].razorpay_order_id,
      razorpaySignature: value.RequestBody.orderData[0].razorpay_signature,
      invoiceDownloadLink: `${config.Server.webUrl}/api/invoice/${value.RequestBody.orderData[0].razorpay_order_id}.pdf`,
      address: value.RequestBody.orderData[0].Address,
      orderTotalPrice: value.RequestBody.orderData[0].amount,
      orderedProducts: value.RequestBody.orderData[1],
      billingName: value.RequestBody.orderData[0].UserName,
      userContact: value.RequestBody.orderData[0].UserContact,
      userEmail: value.RequestBody.orderData[0].UserEmail,
      orderDate: value.RequestBody.orderData[0].OrderDate,
      pickUp: "waiting",
      arrived: "waiting",
      deliveredOrNot: false,
    });
    return this.Cursor;
  }
  //━━━━━━━━━━━━━━━━  other Operations ━━━━━━━━━━━━━━━━ ★
}
