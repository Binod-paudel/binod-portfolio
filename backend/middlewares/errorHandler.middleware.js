function errorHandler(error, req, res, next) {
  let statusCode = error.status || 500;
  let errMsg = error.errMsg || "Internal Server Error";
  res.status(statusCode).json({ err: errMsg, stack: error.stack });
}

export default errorHandler;
