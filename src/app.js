import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js"
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();

//Middleware
app.use(helmet());
app.use(cors());
app.use(apiLimiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
//404 handling
app.use((req, res)=>{
  res.status(404).json({
    message: "Route not found"
  });
});
//Global error handling
app.use(globalErrorHandler);

export default app;