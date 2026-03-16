
import mongoose from "mongoose"
// Completely flexible schema — no field validation.
// Mongoose will store and return the document exactly as it exists in MongoDB,
// including your custom _id like "itn_691f3b...", nested days[], services{}, etc.
const itinerarySchema = new mongoose.Schema(
  {},
  {
    strict: false,      // accept ANY fields from the document
  }
);

itinerarySchema.index({ destinationId: 1 });

export default mongoose.model("Itinerary", itinerarySchema, "Itinerary");