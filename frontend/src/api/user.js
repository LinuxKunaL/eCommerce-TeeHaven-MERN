import axios from "axios";

export const FetchOrderDataForUser = async (isDeliver) => {
  const token = localStorage.getItem("token");
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/fetchOrderDataForUser", {
      ClientToken: token,
      isDeliver: isDeliver,
    })
    .catch((Error) => {
      console.log("Error in FetchOrderDataForUser ( api/user.js ) " + Error);
    });

  return response.data;
};

export const FetchOrderDataById = async (orderId) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/fetchOrderDataById", { orderId })
    .catch((Error) => {
      console.log("Error in FetchOrderDataById ( api/user.js ) " + Error);
    });
  return response.data;
};

export const SetBillingAddress = async (billingAddress) => {
  const token = localStorage.getItem("token");
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/setBillingAddressForUser", {
      ClientToken: token,
      billingAddress: billingAddress,
    })
    .catch((Error) => {
      console.log("Error in SetBillingAddress ( api/user.js ) " + Error);
    });
  return response.data;
};

export const EditAccountDetails = async (details) => {
  const token = localStorage.getItem("token");
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/setAccountDetailsForUser", {
      ClientToken: token,
      UpdatedUserData: details,
    })
    .catch((Error) => {
      console.log("Error in EditAccountDetails ( api/user.js ) " + Error);
    });
  return response.data;
};

export const EditAccountPassword = async (password) => {
  const token = localStorage.getItem("token");
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/setAccountPasswordForUser", {
      ClientToken: token,
      UpdatedUserPassword: password,
    })
    .catch((Error) => {
      console.log("Error in ChangeAccountPassword ( api/user.js ) " + Error);
    });
  return response.data;
};
