import express from "express";
import cookieParser from "cookie-parser";
import logger from "./middlewares/logger.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);


//error handler
app.use(notFoundHandler);
app.use(errorHandler);

export {app}