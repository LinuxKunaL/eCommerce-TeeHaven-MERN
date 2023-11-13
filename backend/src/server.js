import express from "express";
import cors from "cors";
import Config from "../config/index.js";
import RouterMiddleware from "./middlewares/RouterMiddleware.js";
import MainMiddleware from "./middlewares/MainMiddleware.js";
import path, { fileURLToPath } from "url";
import { dirname, join } from "path";
import ejs from 'ejs'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(join(__dirname, "client/build")));

app.get('/', (req, res) => {
  // Assuming your HTML file is named "index.html" in the "views" directory
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


//━━━━━━━━━━━━━━━━ Middleware ━━━━━━━━━━━━━━━━//
MainMiddleware(app, cors, express);
RouterMiddleware(app);
//━━━━━━━━━━━━━━━━ Middleware ━━━━━━━━━━━━━━━━//

app.listen(Config.Server.port, () => {
  console.log("server is running on " + Config.Server.port);
});
