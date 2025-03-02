import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";


dotenv.config();

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

  const app = express();
  app.use(cookieParser());
  app.use(express.json());

  app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, 
    })
);

app.listen(5100, () => {
    console.log("server listening on port 5100");
  });

  app.use("/users", userRoutes);