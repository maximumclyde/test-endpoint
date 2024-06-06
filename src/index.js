import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.clear();
  console.log("Listening on port: ", port);
});
