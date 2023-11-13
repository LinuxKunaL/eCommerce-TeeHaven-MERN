import axios from "axios";

export const AdminLogiN = async (FormData) => {
  const response = await axios.post(process.env.REACT_APP_API_URL+"/api/admin/login", {
    FormData,
  });
  return response.data;
};

export const CheckAdminLogin = async () => {
  const ClientToken = localStorage.getItem("token");

  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/verifyToken",
    { ClientToken }
  );

  return response.data;
};

export const AdminLogout = (Navigate) => {
  localStorage.removeItem("token");
  return Navigate("/");
};

export const AdminChangeCredential = async (newCredential) => {
  const ClientToken = localStorage.getItem("token");
  const response = await axios.post(
    process.env.REACT_APP_API_URL+"/api/admin/updateCredential",
    { ClientToken, newCredential }
  );
  return response.data;
};
