import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    readonly: true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    readonly: true
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
});

export default mongoose.model("User", userSchema);