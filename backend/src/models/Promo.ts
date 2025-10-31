// src/models/Promo.ts
import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercent: Number,
  flatDiscount: Number,
});

export default mongoose.model("Promo", promoSchema);
