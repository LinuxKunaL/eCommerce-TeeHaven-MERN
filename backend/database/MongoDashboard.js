import { MongoClient, ObjectId } from "mongodb";
import config from "../config/index.js";

export default class DashboardMongoQuery {
  constructor() {
    this.client = new MongoClient(config.Database.url);
    this.db = this.client.db(config.Database.db);
    this.Cursor;
  }
  //━━━━━━━━━━━━━━━━ authentication operations ━━━━━━━━━━━━━━━━ ★

  async adminLogin(collection, value) {
    const Collections = this.db.collection(collection);

    this.Cursor = await Collections.findOne(
      typeof value == "object"
        ? {
            userName: value.username,
            password: value.password,
          }
        : { _id: new ObjectId(value) }
    );

    return this.Cursor;
  }

  async updateCredential(collection, value) {
    const Collections = this.db.collection(collection);
    this.Cursor = await Collections.updateOne(
      {},
      {
        $set: {
          userName: value.userName,
          password: value.password,
        },
      }
    );
    return this.Cursor;
  }

  //━━━━━━━━━━━━━━━━ authentication operations ━━━━━━━━━━━━━━━━ ★

  async AppStatistic() {
    const productsOrdersCount = await this.db
      .collection("productsOrders")
      .countDocuments();
    const loginUserDataCount = await this.db
      .collection("loginUserData")
      .countDocuments();
    const productsCount = await this.db.collection("products").countDocuments();
    const visitorCount = await this.db.collection("visitor").countDocuments();
    this.Cursor = {
      productsOrdersCount: productsOrdersCount,
      loginUserDataCount: loginUserDataCount,
      productsCount: productsCount,
      visitorCount: visitorCount,
    };
    return this.Cursor;
  }

  //━━━━━━━━━━━━━━━━ orders operations ━━━━━━━━━━━━━━━━ ★
  async fetchLatestOrder(collection, value) {
    const Collections = this.db.collection(collection);
    var projection = {
      _id: 1,
      deliveredOrNot: 1,
      razorpayOrderId: 1,
      orderTotalPrice: 1,
      orderDate: 1,
      billingName: 1,
    };
    var searchQuery = value.searchQuery;
    var PageNumber = value.PageNumber;
    var PagePerLimit = value.PagePerLimit;
    var PageSkips = (PageNumber - 1) * PagePerLimit;
    var Query = {};

    if (value.filterDate != "") {
      Query = {
        razorpayOrderId: { $regex: new RegExp(searchQuery, "i") },
        orderDate: value.filterDate,
      };
    } else if (value.statusQuery == "all") {
      Query = {
        razorpayOrderId: { $regex: new RegExp(searchQuery, "i") },
      };
    } else {
      Query = {
        razorpayOrderId: { $regex: new RegExp(searchQuery, "i") },
        deliveredOrNot: value.statusQuery,
      };
    }

    const orderCount = await Collections.countDocuments(Query, {
      projection,
    });

    const filteredOrders = await Collections.find(Query, { projection })
      .skip(PageSkips)
      .limit(PagePerLimit)
      .toArray();

    this.Cursor = { orderCount: orderCount, Orders: filteredOrders };
    return this.Cursor;
  }

  async fetchOrderById(collection, value) {
    const Collections = this.db.collection(collection);
    this.Cursor = await Collections.findOne({
      _id: new ObjectId(value),
    });
    return this.Cursor;
  }

  async updateOrderStatus(collection, value) {
    const Collections = this.db.collection(collection);
    this.Cursor = await Collections.updateOne(
      {
        _id: new ObjectId(value.id),
      },
      {
        $set: {
          deliveredOrNot: value.Status == "true" ? true : false,
          pickUp: value.PickupTime,
          arrived: value.ArrivedTime,
        },
      }
    );
    return this.Cursor;
  }

  //━━━━━━━━━━━━━━━━ orders operations ━━━━━━━━━━━━━━━━ ★

  //━━━━━━━━━━━━━━━━ Products operations ━━━━━━━━━━━━━━━━ ★

  async fetchProducts(collection, value) {
    const Collections = this.db.collection(collection);

    var projection = {
      _id: 1,
      title: 1,
      regularprice: 1,
      mainimg: 1,
      productactivate: 1,
    };

    var query = {};
    var PerPageLimit = parseInt(value.PagePerLimit);
    var PageNumber = parseInt(value.PageNumber);
    var SkipProducts = (PageNumber - 1) * PerPageLimit;

    if (value.searchIdQuery !== "") {
      query = {
        _id: new ObjectId(value.searchIdQuery),
      };
    } else if (value.statusQuery == "all") {
      query = {
        title: { $regex: new RegExp(value.searchQuery, "i") },
      };
    } else {
      query = {
        productactivate: value.statusQuery,
        title: { $regex: new RegExp(value.searchQuery, "i") },
      };
    }

    const CountOfProducts = await Collections.countDocuments(query);
    const FilteredProducts = await Collections.find(query, projection)
      .skip(SkipProducts)
      .limit(PerPageLimit)
      .toArray();

    this.Cursor = {
      productsCount: CountOfProducts,
      products: FilteredProducts,
    };

    return this.Cursor;
  }

  async fetchProductById(collection, value) {
    const Collections = this.db.collection(collection);
    this.Cursor = await Collections.findOne({ _id: new ObjectId(value) });
    return this.Cursor;
  }

  async updateProduct(collection, value) {
    const Collections = this.db.collection(collection);
    this.Cursor = await Collections.updateOne(
      { _id: new ObjectId(value.id) },
      {
        $set: {
          title: value.title,
          description: value.description,
          regularprice: value.regularprice,
          orignalprice: value.orignalprice,
          offerdiscount: value.offerdiscount,
          selectsize: value.ProductSize,
          productactivate: value.productActivate,
          hint: value.selectHint,
          category: value.category,
          mainimg: value.MainPreviewImage,
          subimg1: value.SubPreviewImage,
          subimg2: value.Sub2PreviewImage,
          subimg3: value.Sub3PreviewImage,
        },
      }
    );
    return this.Cursor;
  }

  async dropProductById(collection, value) {
    const Collections = this.db.collection(collection);
    this.Cursor = await Collections.deleteOne({
      _id: new ObjectId(value),
    });
    return this.Cursor;
  }

  async insertProduct(collection, value) {
    const Collections = this.db.collection(collection);
    this.Cursor = await Collections.insertOne({
      title: value.title,
      description: value.description,
      regularprice: value.regularprice,
      orignalprice: value.orignalprice,
      offerdiscount: value.offerdiscount,
      selectsize: value.ProductSize,
      productactivate: value.productActivate,
      hint: value.selectHint,
      category: value.category,
      mainimg: value.MainProductImage,
      subimg1: value.SubProductImage,
      subimg2: value.Sub2ProductImage,
      subimg3: value.Sub3ProductImage,
    });
    return this.Cursor;
  }

  //━━━━━━━━━━━━━━━━ Products operations ━━━━━━━━━━━━━━━━ ★

  //━━━━━━━━━━━━━━━━ Register User operations ━━━━━━━━━━━━━━━━ ★

  async fetchRegisterUser(collection, value) {
    const Collections = this.db.collection(collection);
    var searchQuery = value.searchQuery;
    var PagePerLimit = value.PagePerLimit;
    var CurrentPage = value.currentPage;
    var SkipPages = (CurrentPage - 1) * PagePerLimit;

    const UserCount = await Collections.countDocuments();
    const FilteredUsers = await Collections.find({
      FullName: { $regex: new RegExp(searchQuery, "i") },
    })
      .limit(PagePerLimit)
      .skip(SkipPages)
      .toArray();

    this.Cursor = {
      userCount: UserCount,
      users: FilteredUsers,
    };
    return this.Cursor;
  }

  async fetchRegisterUserById(collection, value) {
    const Collections = this.db.collection(collection);
    this.Cursor = await Collections.findOne({
      _id: new ObjectId(value),
    });
    return this.Cursor;
  }

  async fetchRegisterUserOrder(collection, value) {
    const Collections = this.db.collection(collection);
    this.Cursor = await Collections.find({
      userId: value,
    }).toArray();
    return this.Cursor;
  }

  //━━━━━━━━━━━━━━━━ Register User operations ━━━━━━━━━━━━━━━━ ★
}
