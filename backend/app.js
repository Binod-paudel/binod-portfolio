import express from "express";
import cookieParser from "cookie-parser";
import logger from "./middlewares/logger.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";


import authRouter from "./routes/auth.router.js";
import profileRouter from "./routes/profile.router.js";
import skillRouter from "./routes/skill.router.js";
import messageRouter from "./routes/message.router.js";
import projectRouter from "./routes/project.router.js";

const app = express();


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/projects", projectRouter);


//error handler
app.use(notFoundHandler);
app.use(errorHandler);

export {app}