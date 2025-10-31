import { Request, Response } from "express";
import { Booking } from "../models/Booking";
import { Experience } from "../models/Experience";
import  Promo  from "../models/Promo";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { name, email, experienceId, slot, promoCode } = req.body;

    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    // prevent double-booking
    const slotIndex = experience.slots?.findIndex(
      (s: any) => s.date === slot.date && s.time === slot.time && !s.isBooked
    );

    if (slotIndex === undefined || slotIndex === -1)
      return res.status(400).json({ message: "Slot unavailable" });

    // ✅ Type-safe totalPrice
    let totalPrice: number = experience.price ?? 0;

    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode });
      if (promo) {
        if (promo.discountPercent && totalPrice)
          totalPrice = totalPrice - (promo.discountPercent / 100) * totalPrice;

        if (promo.flatDiscount && totalPrice)
          totalPrice = totalPrice - promo.flatDiscount;
      }
    }

    // ✅ Ensure slot array exists and mark slot as booked safely
    if (experience.slots && experience.slots[slotIndex]) {
      experience.slots[slotIndex].isBooked = true;
    }

    await experience.save();

    const booking = new Booking({
      name,
      email,
      experienceId,
      slot,
      totalPrice,
    });
    await booking.save();

    res.json({ message: "Booking confirmed", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
