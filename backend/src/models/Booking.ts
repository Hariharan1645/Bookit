import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience" },
  slot: {
    date: String,
    time: String,
  },
  totalPrice: Number,
  status: { type: String, default: "confirmed" },
});

export const Booking = mongoose.model("Booking", bookingSchema);
