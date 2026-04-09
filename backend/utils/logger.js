const now = () => new Date().toISOString();

export const logInfo = (message, meta) => {
  if (meta != null && typeof meta === "object" && Object.keys(meta).length > 0) {
    console.log(`[${now()}] INFO: ${message}`, meta);
  } else {
    console.log(`[${now()}] INFO: ${message}`);
  }
};

export const logError = (message, meta) => {
  if (meta != null && typeof meta === "object" && Object.keys(meta).length > 0) {
    console.error(`[${now()}] ERROR: ${message}`, meta);
  } else {
    console.error(`[${now()}] ERROR: ${message}`);
  }
};
