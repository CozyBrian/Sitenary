import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["VIEW", "URI_PATH"],
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  platform: String,
});

export default mongoose.model("Event", eventSchema);