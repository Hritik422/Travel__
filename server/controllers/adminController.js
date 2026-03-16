import jwt        from "jsonwebtoken";
import mongoose   from "mongoose";
import Destination from "../models/Destination.js";
import Itinerary   from "../models/Itinerary.js";
import Category    from "../models/Category.js";
import Review      from "../models/Review.js";
import Query       from "../models/Query.js";

const ok  = (res, data, meta = {}) => res.json({ responseCode: 200, ...data, ...meta });
const err = (res, msg, code = 500) => res.status(code).json({ responseCode: code, message: msg });

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const adminLogin = (req, res) => {
  const { username, password } = req.body;
  if (
    username !== (process.env.ADMIN_USERNAME || "admin") ||
    password !== (process.env.ADMIN_PASSWORD || "admin123")
  ) {
    return err(res, "Invalid credentials", 401);
  }
  const token = jwt.sign(
    { isAdmin: true, username },
    process.env.JWT_SECRET || "fallback_secret",
    { expiresIn: "12h" }
  );
  ok(res, { token, username });
};

// ─── DASHBOARD STATS ─────────────────────────────────────────────────────────
export const getDashboardStats = async (req, res) => {
  try {
    const [destinations, categories, reviews, queries, itineraries] = await Promise.all([
      Destination.countDocuments(),
      Category.countDocuments(),
      Review.countDocuments(),
      Query.countDocuments(),
      Itinerary.countDocuments(),
    ]);
    const recentQueries = await Query.find().sort({ createdAt: -1 }).limit(5).lean();
    ok(res, { stats: { destinations, categories, reviews, queries, itineraries }, recentQueries });
  } catch (e) { err(res, e.message); }
};

// ─── DESTINATIONS CRUD ────────────────────────────────────────────────────────
export const getDestinations = async (req, res) => {
  try {
    const items = await Destination.find().sort({ priority: 1 }).lean();
    ok(res, { items, total: items.length });
  } catch (e) { err(res, e.message); }
};

export const createDestination = async (req, res) => {
  try {
    const item = await Destination.create(req.body);
    res.status(201).json({ responseCode: 201, item });
  } catch (e) { err(res, e.message); }
};

export const updateDestination = async (req, res) => {
  try {
    const item = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: false });
    if (!item) return err(res, "Not found", 404);
    ok(res, { item });
  } catch (e) { err(res, e.message); }
};

export const deleteDestination = async (req, res) => {
  try {
    const item = await Destination.findByIdAndDelete(req.params.id);
    if (!item) return err(res, "Not found", 404);
    ok(res, { message: "Deleted successfully" });
  } catch (e) { err(res, e.message); }
};

// ─── ITINERARY CRUD ───────────────────────────────────────────────────────────
export const getItineraries = async (req, res) => {
  try {
    const items = await Itinerary.find().lean();
    ok(res, { items, total: items.length });
  } catch (e) { err(res, e.message); }
};

export const getItineraryById = async (req, res) => {
  try {
    const item = await Itinerary.findOne({ _id: req.params.id }).lean()
      || await Itinerary.findOne({ destinationId: req.params.id }).lean();
    if (!item) return err(res, "Not found", 404);
    ok(res, { item });
  } catch (e) { err(res, e.message); }
};

export const createItinerary = async (req, res) => {
  try {
    // If no _id provided, generate one
    const body = { ...req.body };
    if (!body._id) body._id = `itn_${new mongoose.Types.ObjectId()}`;
    const item = await Itinerary.create(body);
    res.status(201).json({ responseCode: 201, item });
  } catch (e) { err(res, e.message); }
};

export const updateItinerary = async (req, res) => {
  try {
    const item = await Itinerary.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!item) return err(res, "Not found", 404);
    ok(res, { item });
  } catch (e) { err(res, e.message); }
};

export const deleteItinerary = async (req, res) => {
  try {
    const item = await Itinerary.findOneAndDelete({ _id: req.params.id });
    if (!item) return err(res, "Not found", 404);
    ok(res, { message: "Deleted successfully" });
  } catch (e) { err(res, e.message); }
};

// ─── CATEGORIES CRUD ──────────────────────────────────────────────────────────
export const getCategories = async (req, res) => {
  try {
    const items = await Category.find().lean();
    ok(res, { items, total: items.length });
  } catch (e) { err(res, e.message); }
};

export const createCategory = async (req, res) => {
  try {
    const item = await Category.create(req.body);
    res.status(201).json({ responseCode: 201, item });
  } catch (e) { err(res, e.message); }
};

export const updateCategory = async (req, res) => {
  try {
    const item = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return err(res, "Not found", 404);
    ok(res, { item });
  } catch (e) { err(res, e.message); }
};

export const deleteCategory = async (req, res) => {
  try {
    const item = await Category.findByIdAndDelete(req.params.id);
    if (!item) return err(res, "Not found", 404);
    ok(res, { message: "Deleted successfully" });
  } catch (e) { err(res, e.message); }
};

// ─── REVIEWS CRUD ─────────────────────────────────────────────────────────────
export const getReviews = async (req, res) => {
  try {
    const items = await Review.find().sort({ rating: -1 }).lean();
    ok(res, { items, total: items.length });
  } catch (e) { err(res, e.message); }
};

export const createReview = async (req, res) => {
  try {
    const item = await Review.create(req.body);
    res.status(201).json({ responseCode: 201, item });
  } catch (e) { err(res, e.message); }
};

export const updateReview = async (req, res) => {
  try {
    const item = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return err(res, "Not found", 404);
    ok(res, { item });
  } catch (e) { err(res, e.message); }
};

export const deleteReview = async (req, res) => {
  try {
    const item = await Review.findByIdAndDelete(req.params.id);
    if (!item) return err(res, "Not found", 404);
    ok(res, { message: "Deleted successfully" });
  } catch (e) { err(res, e.message); }
};

// ─── QUERIES (read + delete + status update) ──────────────────────────────────
export const getQueries = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const items = await Query.find(filter).sort({ createdAt: -1 }).lean();
    ok(res, { items, total: items.length });
  } catch (e) { err(res, e.message); }
};

export const deleteQuery = async (req, res) => {
  try {
    const item = await Query.findByIdAndDelete(req.params.id);
    if (!item) return err(res, "Not found", 404);
    ok(res, { message: "Deleted successfully" });
  } catch (e) { err(res, e.message); }
};
