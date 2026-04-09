import { logError } from "../utils/logger.js";

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  logError(err.message || "Unhandled error", {
    method: req.method,
    url: req.originalUrl,
    statusCode,
    stack: err.stack
  });

  res.status(statusCode).json({
    message: err.message || "Server Error"
  });
};
