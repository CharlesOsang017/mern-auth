import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.route.js";
import morgan from "morgan";

dotenv.config();

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ["https://chronos-lemon-five.vercel.app"] 
  : ["http://localhost:5173"];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());



app.use("/api/v1/auth", authRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`), connectToDB();
});
