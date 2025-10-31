// src/routes/promoRoutes.ts
import express from "express";
import Promo from "../models/Promo";

const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const promo = await Promo.findOne({ code: req.params.code });
    if (!promo) return res.status(404).json({ valid: false, message: "Promo not found" });
    res.json({ valid: true, promo });
  } catch (err) {
    res.status(500).json({ valid: false, message: "Server error" });
  }
});

export default router;
