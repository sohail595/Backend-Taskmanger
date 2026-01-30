import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";

// Vercel serverless handler
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req, res);
}