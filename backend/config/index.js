export default {
  Server: {
    port: 9090,
    webUrl: "http://localhost:9090",
  },
  Database: {
    url: "mongodb://127.0.0.1:27017",
    db: "teeSpace",
    adminCredential: {
      uname: "admin",
      pass: "admin",
    },
  },
  Jwt: {
    secretKey: "MYNAMEISKUNAL",
  },
  Razorpay: {
    key_id: "rzp_test_2QWR7ZjFNrN42p",
    key_secret: "BHXqayvQLPSmFAgXe6YmFaFC",
  },
  GoogleSMTP: {
    host: "smtp.gmail.com",
    port: 465,
    user: "thelosser321@gmail.com",
    pass: "eavp rcki dqkm qtie",
  },
};
