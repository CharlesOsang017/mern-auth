import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/v1/auth", authRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`), connectToDB();
});
