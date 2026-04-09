const now = () => new Date().toISOString();

export const logInfo = (message, meta = {}) => {
  console.log(`[${now()}] INFO: ${message}`, meta);
};

export const logError = (message, meta = {}) => {
  console.error(`[${now()}] ERROR: ${message}`, meta);
};
