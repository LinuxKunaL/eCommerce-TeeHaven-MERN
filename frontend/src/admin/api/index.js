import axios from "axios";

export const GetDashboardMainData = async () => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/getDashboardMainData",
    { ClientToken }
  );
  return response.data;
};

export const GetDashboardLatestOrders = async (
  filterDate,
  searchQuery,
  statusQuery,
  PageNumber,
  PagePerLimit
) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/getDashboardLatestOrdersData",
    {
      ClientToken,
      param: {
        filterDate: filterDate,
        searchQuery: searchQuery,
        statusQuery: statusQuery,
        PageNumber: PageNumber,
        PagePerLimit: PagePerLimit,
      },
    }
  );
  return response.data;
};

export const GetOrderDetailById = async (OrderId) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/getDashboardOrdersDetailById",
    { ClientToken, OrderId }
  );
  return response.data;
};

export const UpdateOrderStatus = async (updatedData) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/updateOrderStatus",
    { ClientToken, updatedData }
  );

  return response.data;
};

export const GetDashboardProducts = async (
  searchQuery,
  searchIdQuery,
  statusQuery,
  PageNumber,
  PagePerLimit
) => {
  const ClientToken = localStorage.getItem("token");

  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/getDashboardProducts",
    {
      ClientToken,
      param: {
        searchQuery: searchQuery,
        searchIdQuery: searchIdQuery,
        statusQuery: statusQuery,
        PageNumber: PageNumber,
        PagePerLimit: PagePerLimit,
      },
    }
  );

  return response.data;
};

export const GetDashboardProductById = async (id) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/getDashboardProductById",
    { ClientToken, id }
  );

  return response.data;
};

export const UpdateDashboardProduct = async (UpdatedProduct) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/updateDashboardProduct",
    { ClientToken, UpdatedProduct }
  );

  return response.data;
};

export const PostImageFileForProduct = async (ImageFile) => {
  const formData = new FormData();
  formData.append("image", ImageFile);

  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/generateImageUrl",
    formData
  );

  return response.data;
};

export const ProductDeleteById = async (id) => {
  const ClientToken = localStorage.getItem("token");

  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/dropDashboardProductById",
    { ClientToken, id }
  );
  return response.data;
};

export const PostDashboardProduct = async (ProductData) => {
  const ClientToken = localStorage.getItem("token");

  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/insertDashboardProduct",
    { ClientToken, ProductData }
  );
  return response.data;
};

export const GetDashboardRegisterUserData = async (
  currentPage,
  searchQuery,
  PagePerLimit
) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/getDashboardRegisterUserData",
    { ClientToken, param: { currentPage, searchQuery, PagePerLimit } }
  );
  return response.data;
};

export const GetDashboardRegisterUsersOrders = async (userId) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/getDashboardRegisterUsersOrders",
    { ClientToken, userId }
  );
  return response.data;
};

export const GetRegisterUsersDetailsById = async (id) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/admin/getDashboardRegisterUserById", {
      id,
      ClientToken,
    })
    .catch((Error) => {
      console.log("Error in GetUserDetailById " + Error);
    });

  return response.data;
};

export const GetProductReviewById = async (ProductId) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/fetchProductReviewById", { ProductId })
    .catch((Error) => {
      console.log("Error in GetProductReviewById " + Error);
    });
  return response.data;
};
