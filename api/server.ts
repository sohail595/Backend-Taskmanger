import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";
import connectDB from "../src/config/db";


connectDB();

// Vercel serverless handler
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req, res);
}