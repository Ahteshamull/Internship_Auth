import express from "express";
import { dbConnectDb } from "./db/dbConnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import path from "path";


import authRoutes from "./routes/auth.routes.js"
dotenv.config();
const app = express();
// const __dirname = path.resolve();
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


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
//   });
// }


app.listen(PORT, () => {
  dbConnectDb();
  console.log(`Server is running on port ${PORT}` );
});
