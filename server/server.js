import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import apiRoutes   from "./routes/api.js";
import adminRoutes from "./routes/admin.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Connect DB ───────────────────────────────────────────────────────────────
connectDB();

// ─── Security & Middleware ────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:3000",      "https://your-client.vercel.app",     
      "https://www.onetravelexpert.com" 
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "id"],
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiter: 200 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { responseCode: 429, message: "Too many requests. Please slow down." },
});
app.use("/api", limiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "✅ One Travel Expert API is live",
    version: "2.0.0",
    endpoints: [
      "GET  /api/travel",
      "GET  /api/travel/:id",
      "GET  /api/itinerary?id=:id",
      "GET  /api/search?location=:query",
      "GET  /api/reviews",
      "POST /api/query",
      "GET  /api/bycategory",
    ],
  });
});

app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
// });

export default app;