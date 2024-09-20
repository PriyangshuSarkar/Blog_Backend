import { ZodError } from "zod";
import { rm } from "fs";

export const errorHandler = (err, req, res) => {
  console.log(err);

  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError) {
    message = "Un-processable Entity!";
  }

  if (req.filePaths && req.filePaths.length > 0) {
    cleanupFiles(req.filePaths).finally(() => {
      return res.status(status).json({
        message,
        error: err,
      });
    });
  } else {
    return res.status(status).json({
      message,
      error: err,
    });
  }
  return res.status(status).json({
    message,
    error: err,
  });
};

// Function to clean up files
async function cleanupFiles(filePaths) {
  for (const filePath of filePaths) {
    try {
      await rm(filePath, () => console.log("Deleted"));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }
}
