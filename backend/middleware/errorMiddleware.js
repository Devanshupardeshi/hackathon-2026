import { logError } from "../utils/logger.js";

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, _next) => {
  const reqId = req.reqId || "-";
  if (err.code === "LIMIT_FILE_SIZE") {
    console.error(`[ERR ${reqId}] Multer: file too large`, err.message);
    return res.status(400).json({ message: "Image must be 5MB or smaller" });
  }
  if (err.message && /image|multer|file/i.test(err.message) && err.name === "Error") {
    console.error(`[ERR ${reqId}] ${req.method} ${req.originalUrl}`, err.message);
    logError(err.message, { method: req.method, url: req.originalUrl, reqId });
    return res.status(400).json({ message: err.message });
  }
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error(`[ERR ${reqId}] ${req.method} ${req.originalUrl} → ${statusCode}`);
  console.error(err.stack || err.message || err);
  logError(err.message || "Unhandled error", {
    method: req.method,
    url: req.originalUrl,
    statusCode,
    reqId,
    stack: err.stack
  });

  res.status(statusCode).json({
    message: err.message || "Server Error"
  });
};
