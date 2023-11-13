export default {
  Server: {
    port: 9090,
    webUrl: "http://localhost:9090",
  },
  Database: {
    url: "mongodb://127.0.0.1:27017",
    db: "teeHaven"
  },
  Jwt: {
    secretKey: "",
  },
  Razorpay: {
    key_id: "",
    key_secret: "",
  },
  GoogleSMTP: {
    host: "smtp.gmail.com",
    port: 465,
    user: "",
    pass: "",
  },
};
