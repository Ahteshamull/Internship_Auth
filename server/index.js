import express from "express";
import { dbConnectDb } from "./db/dbConnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRoutes from "./routes/auth.routes.js"
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))

app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
  dbConnectDb();
  console.log(`Server is running on port ${PORT}` );
});
