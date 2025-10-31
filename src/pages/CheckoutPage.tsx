import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { exp, slot } = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<{ percent?: number; flat?: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!exp || !slot)
    return <div className="py-20 text-center text-gray-500">Missing booking info</div>;

  const isValidEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  // ✅ Handle promo with DB + dynamic discount
  const handleApplyPromo = async () => {
    const code = promo.trim();
    if (!code) {
      setPromoError("Enter a promo code");
      setPromoApplied(false);
      return;
    }

    try {
      const res = await api.get(`/promos/${code}`);
      if (res.data.valid) {
        const promoData = res.data.promo;
        setPromoApplied(true);
        setPromoError(null);

        // save discount details
        setPromoDiscount({
          percent: promoData.discountPercent,
          flat: promoData.flatDiscount,
        });

        alert(
          `Promo applied: ${
            promoData.discountPercent
              ? `${promoData.discountPercent}% off`
              : `₹${promoData.flatDiscount} off`
          }`
        );
      } else {
        setPromoError("Invalid promo code");
        setPromoApplied(false);
      }
    } catch {
      setPromoError("Invalid promo or server error");
      setPromoApplied(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!agreed) {
      alert("You must agree to the terms and safety policy before proceeding.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/bookings", {
        name,
        email,
        experienceId: exp._id,
        slot,
        promoCode: promoApplied ? promo.trim() : undefined,
      });
      navigate("/result", { state: { success: true, booking: res.data.booking } });
    } catch {
      navigate("/result", { state: { success: false } });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Compute totals dynamically
  const baseSubtotal = exp.price;
  const taxes = 59;

  let discountedSubtotal = baseSubtotal;
  if (promoDiscount) {
    if (promoDiscount.percent)
      discountedSubtotal -= (promoDiscount.percent / 100) * baseSubtotal;
    if (promoDiscount.flat)
      discountedSubtotal -= promoDiscount.flat;
  }

  const total = Math.max(discountedSubtotal + taxes, 0);

  const emailValid = isValidEmail(email.trim());
  const isFormValid = name.trim().length > 0 && emailValid;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-6 text-sm sm:text-base"
      >
        <span className="font-semibold">← Checkout</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 sm:gap-10">
        {/* -------- LEFT FORM -------- */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-5 sm:p-6 rounded-xl space-y-6 shadow-sm w-full"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 rounded-md bg-white border border-gray-200 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-md bg-white border border-gray-200 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                placeholder="Your Email"
              />
              {!emailValid && email.trim().length > 0 && (
                <p className="text-xs text-red-500 mt-1">Please enter a valid email address.</p>
              )}
            </div>
          </div>

          {/* Promo Section */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Promo code</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={promo}
                onChange={(e) => {
                  setPromo(e.target.value);
                  setPromoError(null);
                  setPromoApplied(false);
                  setPromoDiscount(null);
                }}
                disabled={promoApplied}
                className="flex-1 p-3 rounded-md bg-white border border-gray-200 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                placeholder="Enter promo code"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                disabled={promoApplied}
                className={`px-5 py-2.5 rounded-md text-white font-medium transition ${
                  promoApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {promoApplied ? "Applied" : "Apply"}
              </button>
            </div>
            {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
            {promoApplied && <p className="text-xs text-green-600 mt-1">Promo applied successfully!</p>}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 accent-yellow-400 w-4 h-4"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
              I agree to the terms and safety policy.
            </label>
          </div>
        </form>

        {/* -------- RIGHT SUMMARY -------- */}
        <aside className="bg-white shadow-md rounded-xl p-5 sm:p-6 h-fit sticky top-20">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Experience</span>
              <span className="font-medium">{exp.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span>{slot.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time</span>
              <span>{slot.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Qty</span>
              <span>1</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{baseSubtotal}</span>
            </div>

            {promoDiscount && (
              <div className="flex justify-between text-green-600">
                <span>Promo discount</span>
                <span>
                  -₹
                  {promoDiscount.percent
                    ? ((promoDiscount.percent / 100) * baseSubtotal).toFixed(0)
                    : promoDiscount.flat || 0}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600">Taxes</span>
              <span>₹{taxes}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              className={`w-full mt-4 py-3 rounded-md font-medium transition text-black ${
                !isFormValid || loading
                  ? "bg-yellow-300 opacity-60 cursor-not-allowed"
                  : "bg-[#FFD60A] hover:bg-yellow-400"
              }`}
            >
              {loading ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
