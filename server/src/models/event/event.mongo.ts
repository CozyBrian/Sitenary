import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["VIEW", "URI_PATH"],
    required: true,
  },
  ip: String,
  origin: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  platform: String,
});

export default mongoose.model("Event", eventSchema);