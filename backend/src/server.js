import express from "express";
import cors from "cors";
import Config from "../config/index.js";
import RouterMiddleware from "./middlewares/RouterMiddleware.js";
import MainMiddleware from "./middlewares/MainMiddleware.js";
 
const app = express();

//━━━━━━━━━━━━━━━━ Middleware ━━━━━━━━━━━━━━━━//
MainMiddleware(app, cors, express);
RouterMiddleware(app);
//━━━━━━━━━━━━━━━━ Middleware ━━━━━━━━━━━━━━━━//

app.listen(Config.Server.port, () => {
  console.log("server is running on " + Config.Server.port);
});
