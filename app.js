import express from "express";
import router from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
// To deploy our server as our lerver has link of localhost which is not allowed in browser
import cors from "cors";
export const app = express();
config({
  path: "./data/config.env",
});
// always use express.json() above router
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use("/api/v1/users", router);
app.use("/api/v1/task", taskRouter);
app.get("/", (req, res) => {
  res.send("Nice Working");
});
// Using error Middleware
app.use(errorMiddleware);
