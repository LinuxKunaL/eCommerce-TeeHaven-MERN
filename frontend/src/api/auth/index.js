import axios from "axios";
import { setTrue, setFalse } from "../../App/redux/states/userLoginState";

export const GenerateOtpForEmail = async (email) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/generateOtpForEmail", { email })
    .catch((Error) => {
      console.log(Error + "In EmailVerification");
    });
  return response.data;
};

export const VerifyGeneratedOtpForEmail = async (email, otp) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/verifyGeneratedOtpForEmail", {
      email,
      otp,
    })
    .catch((Error) => {
      console.log(Error + "In VerifyGeneratedOtpForEmail");
    });
  return response.data;
};  

export const createAccount = async (formData) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/signup", formData)
    .catch((Error) => {
      console.log(Error + "In createAccount ");
    });
  return response.data;
};

export const LoginAccount = async (fromData) => {
  const response = await axios
    .post(process.env.REACT_APP_API_URL+"/api/signIn", {
      fromData,
    })
    .catch((Error) => {
      console.log(Error + "In LoginAccount");
    });

  return response;
};

export const CheckUserLogin = async (dispatch) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(process.env.REACT_APP_API_URL+"/api/checkToken", {
    ClientToken,
  });
  if (response.data.userCheck) {
    dispatch(setTrue());
  } else {
    dispatch(setFalse());
  }
};

export const GetUserDetails = async () => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(process.env.REACT_APP_API_URL+"/api/fetchUserDetails", {
    ClientToken,
  });
  if (response.data.message) {
    return [];
  } else {
    return response.data;
  }
};

export const logOut = async (Navigate, dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  dispatch(setFalse());
  Navigate("/");
};
