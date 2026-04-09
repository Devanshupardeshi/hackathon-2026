import { logError, logInfo } from "../utils/logger.js";

const SENSITIVE_KEYS = new Set([
  "password",
  "otp",
  "token",
  "accesstoken",
  "refreshtoken",
  "authorization",
  "smtp_pass",
  "secret"
]);

const sanitize = (value, depth = 0) => {
  if (value == null || depth > 4) return value;
  if (typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((v) => sanitize(v, depth + 1));
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    if (SENSITIVE_KEYS.has(String(k).toLowerCase())) {
      out[k] = "[redacted]";
    } else {
      out[k] = typeof v === "object" && v !== null ? sanitize(v, depth + 1) : v;
    }
  }
  return out;
};

/**
 * Logs every API request and response (status + duration). Helps trace errors in the terminal.
 */
export const requestLogger = (req, res, next) => {
  if (!req.originalUrl.startsWith("/api")) {
    return next();
  }

  const start = Date.now();
  const reqId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  req.reqId = reqId;

  const bodyPreview =
    req.body && typeof req.body === "object" && Object.keys(req.body).length
      ? sanitize(req.body)
      : undefined;

  logInfo(`[REQ ${reqId}] ${req.method} ${req.originalUrl}`, {
    query: Object.keys(req.query || {}).length ? req.query : undefined,
    body: bodyPreview
  });

  let logged = false;
  const finish = () => {
    if (logged) return;
    logged = true;
    const ms = Date.now() - start;
    const line = `[RES ${reqId}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`;
    if (res.statusCode >= 500) {
      logError(line, { statusCode: res.statusCode });
    } else if (res.statusCode >= 400) {
      logInfo(`${line} (4xx)`);
    } else {
      logInfo(line);
    }
  };

  res.on("finish", finish);
  res.on("close", finish);

  next();
};
