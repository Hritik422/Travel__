import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    id:       { type: Number },             // numeric id field in your docs
    name:     { type: String, trim: true },
    location: { type: String, trim: true },
    photo:    { type: String },             // photo URL (can be empty string)
    rating:   { type: Number },
    quote:    { type: String },             // ← your field is "quote", NOT "text"
  },
  { timestamps: true, strict: false }
);

reviewSchema.index({ rating: -1 });

export default mongoose.model("Review", reviewSchema);
