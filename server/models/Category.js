import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: { type: String, trim: true },  // slug e.g. "honeymoon"
    title:    { type: String, trim: true },  // display name e.g. "Honeymoon"
    subtitle: { type: String },
    image:    { type: String },
  },
  { timestamps: true, strict: false }
);

categorySchema.index({ category: 1 });

export default mongoose.model("Category", categorySchema);
