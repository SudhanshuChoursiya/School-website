import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./route/userRoutes.js";
const options = {
  origin: process.env.CROSS_ORIGIN,
  credentials: true,
};

app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("", userRoutes);

export { app };
