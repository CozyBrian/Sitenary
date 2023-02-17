import mongoose from "mongoose";
import { eventSchema } from "../event/event.mongo";

const siteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", readonly: true },
  events: [eventSchema],
});

export default mongoose.model("Site", siteSchema);