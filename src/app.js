import express, { json } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/dbConnect.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(json());
app.use(morgan("dev"));
// app.use("/public", static_("./public"));

connectToDatabase();

app.use(errorHandler);

// *Server Start
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server failed to start with error:\n${err}`);
  } else {
    console.log(`Server running at PORT:${PORT}`);
  }
});
