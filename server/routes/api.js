import express from "express";
import {
  getDestinations,
  getDestinationById,
  getItinerary,
  searchDestinations,
  getReviews,
  postQuery,
  getCategories,
} from "../controllers/travelController.js";

const router = express.Router();

// Destinations
router.get("/travel", getDestinations);
router.get("/travel/:id", getDestinationById);

// Itinerary (accepts id via header or query param)
router.get("/itinerary", getItinerary);

// Search
router.get("/search", searchDestinations);

// Reviews
router.get("/reviews", getReviews);

// Contact / Lead form
router.post("/query", postQuery);

// Categories (travel styles)
router.get("/bycategory", getCategories);

export default router;
