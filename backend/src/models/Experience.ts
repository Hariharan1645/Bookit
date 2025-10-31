import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: String,
  time: String,
  isBooked: { type: Boolean, default: false },
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  description: String,
  price: Number,
  image: String,
  slots: [slotSchema],
});

export const Experience = mongoose.model("Experience", experienceSchema);
