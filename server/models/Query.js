import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    name:     { type: String, trim: true },
    email:    { type: String, trim: true, lowercase: true },
    contact:  { type: String, trim: true },
    location: { type: String, trim: true },
    message:  { type: String },
    // __v is auto-added by Mongoose — no need to define
  },
  { timestamps: true, strict: false }
);

querySchema.index({ createdAt: -1 });

export default mongoose.model("Query", querySchema);
