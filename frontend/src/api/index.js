import axios from "axios";

export const GetProductData = async (page, limit, category, searchQuery) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL + "/api/fetchShopProducts", {
      param: {
        page: page,
        limit: limit,
        category: category,
        searchQuery: searchQuery,
      },
    })
    .catch((Error) => {
      console.log("Error in GetProductData" + Error);
    });
  return response.data;
};

export const GetProductById = async (id) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL + "/api/fetchProductById", { id })
    .catch((Error) => {
      console.log("Error in GetProductById" + Error);
    });
  // console.log(response.data);
  return response.data;
};

export const GetPaymentOrder = async (amount) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL + "/api/createOrder", {
      amount,
    })
    .catch((Error) => {
      console.log("Error in GetPaymentOrder " + Error);
    });

  return response.data;
};

export const PostOrderDetails = async (orderData) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL + "/api/postOrderDetails", {
      orderData,
    })
    .catch((Error) => {
      console.log("Error in PostOrderDetails " + Error);
    });

  return response.data;
};

export const PostProductReview = async (ProductReview) => {
  const response = await axios
    .post(
      process.env.REACT_APP_API_URL + "/api/postProductReview",
      ProductReview
    )
    .catch((Error) => {
      console.log("Error in PostProductReview " + Error);
    });

  return response.data;
};

export const GetProductReviewById = async (ProductId) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL + "/api/fetchProductReviewById", {
      ProductId,
    })
    .catch((Error) => {
      console.log("Error in GetProductReviewById " + Error);
    });

  return response.data;
};

export const postVisitorIp = async (ip) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL + "/api/postIpAddress", { ip })
    .catch((Error) => {
      console.log("Error in postVisitorIp " + Error);
    });

  return response.data;
};
