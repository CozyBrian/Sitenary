import mongoose from "mongoose";
import { eventSchema } from "../event/event.mongo";

const siteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  events: [eventSchema],
});

export default mongoose.model("Site", siteSchema);