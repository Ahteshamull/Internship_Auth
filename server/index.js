import express from "express";
import { dbConnectDb } from "./db/dbConnect.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
dotenv.config();
const app = express();

app.use("/api/auth", authRoutes)






app.listen(3000, () => {
  dbConnectDb();
  console.log("Server is running on port 3000");
});
