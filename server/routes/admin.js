import express from "express";
import { requireAdmin } from "../middleware/adminAuth.js";
import {
  adminLogin, getDashboardStats,
  getDestinations, createDestination, updateDestination, deleteDestination,
  getItineraries, getItineraryById, createItinerary, updateItinerary, deleteItinerary,
  getCategories, createCategory, updateCategory, deleteCategory,
  getReviews, createReview, updateReview, deleteReview,
  getQueries, deleteQuery,
} from "../controllers/adminController.js";

const r = express.Router();

// Auth — public
r.post("/login", adminLogin);

// All routes below require valid admin JWT
r.use(requireAdmin);

r.get("/stats", getDashboardStats);

// Destinations
r.get("/destinations",          getDestinations);
r.post("/destinations",         createDestination);
r.put("/destinations/:id",      updateDestination);
r.delete("/destinations/:id",   deleteDestination);

// Itinerary
r.get("/itinerary",             getItineraries);
r.get("/itinerary/:id",         getItineraryById);
r.post("/itinerary",            createItinerary);
r.put("/itinerary/:id",         updateItinerary);
r.delete("/itinerary/:id",      deleteItinerary);

// Categories
r.get("/categories",            getCategories);
r.post("/categories",           createCategory);
r.put("/categories/:id",        updateCategory);
r.delete("/categories/:id",     deleteCategory);

// Reviews
r.get("/reviews",               getReviews);
r.post("/reviews",              createReview);
r.put("/reviews/:id",           updateReview);
r.delete("/reviews/:id",        deleteReview);

// Queries (leads)
r.get("/queries",               getQueries);
r.delete("/queries/:id",        deleteQuery);

export default r;
