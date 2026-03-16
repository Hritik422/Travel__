import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    // Exact fields from your real documents
    name:        { type: String, required: true, trim: true },
    image:       { type: String },
    description: { type: String },
    priority:    { type: String },          // stored as string "1", "2" etc.
    location:    { type: String, trim: true },
    category:    { type: String, trim: true }, // e.g. "Honeymoon"
  },
  { timestamps: true, strict: false }       // strict:false keeps any extra fields
);

destinationSchema.index({ name: "text", location: "text", description: "text" });
destinationSchema.index({ location: 1 });
destinationSchema.index({ category: 1 });

export default mongoose.model("Destination", destinationSchema);
