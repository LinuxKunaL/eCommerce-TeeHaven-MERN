import axios from "axios";

export const getIp = async () => {
  const response = await axios.get("https://api.ipify.org/?format=json");
  return response.data.ip;
};
