import mongoose from "mongoose";
import { eventSchema } from "../event/event.mongo";

const siteSchema = new mongoose.Schema({
  name: String,
  url: String,
  events: [eventSchema],
});

export default mongoose.model("Site", siteSchema);