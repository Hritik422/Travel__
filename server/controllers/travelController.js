import Destination from "../models/Destination.js";
import Itinerary   from "../models/Itinerary.js";
import Review      from "../models/Review.js";
import Query       from "../models/Query.js";
import Category    from "../models/Category.js";
import mongoose    from "mongoose";

const ok  = (res, items, meta = {}) => res.json({ responseCode: 200, items, ...meta });
const err = (res, message = "Server error", code = 500) =>
  res.status(code).json({ responseCode: code, message });

// ─── DESTINATIONS ─────────────────────────────────────────────────────────────
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({}).sort({ priority: 1 }).lean();
    ok(res, destinations);
  } catch (e) { err(res, e.message); }
};

export const getDestinationById = async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id).lean();
    if (!dest) return err(res, "Destination not found", 404);
    ok(res, dest);
  } catch (e) { err(res, e.message); }
};

// ─── ITINERARY ─────────────────────────────────────────────────────────────────
export const getItinerary = async (req, res) => {
  try {
    const id = (req.headers?.id || req.query?.id || "").trim();
    if (!id) return err(res, "Destination ID required", 400);

    // 1️⃣  destinationId stored as plain string
    let itinerary = await Itinerary.findOne({destinationId:id});
    console.log("It------>", itinerary);
    console.log("ID-----------------", typeof id);
    // 2️⃣  If id is valid ObjectId, also try its string representation
    if (!itinerary && mongoose.isValidObjectId(id)) {
      const asString = new mongoose.Types.ObjectId(id).toString();
      if (asString !== id) {
        itinerary = await Itinerary.findOne({ destinationId: asString }).lean();
      }
    }

    // 3️⃣  Fallback: look up by the itinerary's own _id
    if (!itinerary) {
      itinerary = await Itinerary.findById(id).lean();
    }

    if (!itinerary) return ok(res, null);
    ok(res, itinerary);
  } catch (e) { err(res, e.message); }
};


// ─── SEARCH ───────────────────────────────────────────────────────────────────
export const searchDestinations = async (req, res) => {
  try {
    const { location } = req.query;
    if (!location?.trim()) return ok(res, []);
    const results = await Destination.find({
      $or: [
        { name:     { $regex: location, $options: "i" } },
        { location: { $regex: location, $options: "i" } },
        { category: { $regex: location, $options: "i" } },
      ],
    })
      .select("name location image description _id")
      .limit(10)
      .lean();
    ok(res, results);
  } catch (e) { err(res, e.message); }
};

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ rating: -1 }).limit(12).lean();
    ok(res, reviews);
  } catch (e) { err(res, e.message); }
};

// ─── QUERY (Contact Form) ─────────────────────────────────────────────────────
export const postQuery = async (req, res) => {
  try {
    const { name, email, contact, location, message } = req.body;
    if (!name?.trim() || !email?.trim())
      return err(res, "Name and email are required", 400);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return err(res, "Invalid email address", 400);
    const query = await Query.create({ name, email, contact, location, message });
    res.status(201).json({ responseCode: 201, message: "Query submitted successfully", id: query._id });
  } catch (e) { err(res, e.message); }
};

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).lean();
    ok(res, categories);
  } catch (e) { err(res, e.message); }
};
