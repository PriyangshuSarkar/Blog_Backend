import { PrismaClient } from "@prisma/client";
import { tryCatch } from "../middleware/tryCatch.js";

const prisma = new PrismaClient();

export const connectToDatabase = tryCatch(async () => {
  await prisma.$connect();
  console.log("Database Connected");
});
