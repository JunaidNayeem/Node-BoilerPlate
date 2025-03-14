import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../src/routes/index.js";

export function expressConnection() {
  const app = express();
  const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use("/", router)

  return app;
}
