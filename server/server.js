import express from "express";
// cors import gone ✓
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/api.js";
import adminRoutes from "./routes/admin.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

connectDB();

// ─── CORS ─────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://onetravelexpert.com",
  "https://www.onetravelexpert.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,id");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

// ─── Rest of middleware ───────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const limiter = rateLimit({ windowMs: 15*60*1000, max: 200 });
app.use("/api", limiter);

app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
