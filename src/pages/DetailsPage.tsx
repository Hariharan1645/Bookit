import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";

type Slot = { date: string; time: string; isBooked?: boolean };
type Exp = {
  _id: string;
  title: string;
  location?: string;
  description?: string;
  price: number;
  image?: string;
  slots: Slot[];
};

export default function DetailsPage() {
  const { id } = useParams();
  const [exp, setExp] = useState<Exp | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/experiences/${id}`);
        setExp(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const subtotal = exp?.price ? exp.price * quantity : 0;
  const taxes = 59 * quantity;
  const total = subtotal + taxes;

  if (loading)
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        Loading...
      </div>
    );
  if (!exp)
    return (
      <div className="py-20 text-center text-red-500 text-lg">
        Experience not found
      </div>
    );

  const availableDates = Array.from(new Set(exp.slots.map((s) => s.date)));

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime)
      return alert("Please select a date and time!");
    const slot = exp.slots.find(
      (s) => s.date === selectedDate && s.time === selectedTime
    );
    navigate("/checkout", { state: { exp, slot } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-6 text-sm sm:text-base"
      >
        <span className="font-semibold">← Back</span>
      </button>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16">
        {/* ---------- LEFT SIDE ---------- */}
        <div>
          <img
            src={exp.image}
            alt={exp.title}
            className="w-full h-[250px] sm:h-[360px] lg:h-[420px] object-cover rounded-xl mb-6"
          />
          <h1 className="text-xl sm:text-2xl font-semibold mb-3">{exp.title}</h1>
          <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
            {exp.description ||
              "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and life jackets along with an expert will accompany in kayaking."}
          </p>

          {/* Choose Date */}
          <h4 className="font-medium mb-3 text-sm sm:text-base">Choose date</h4>
          <div className="flex flex-wrap gap-2 mb-8">
            {availableDates.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDate(d)}
                className={`px-3 py-2 text-xs sm:text-sm rounded-md border transition ${
                  selectedDate === d
                    ? "bg-[#FFD60A] text-black border-transparent"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Choose Time */}
          <h4 className="font-medium mb-3 text-sm sm:text-base">Choose time</h4>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
            {exp.slots
              .filter((s) => s.date === selectedDate)
              .map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(s.time)}
                  disabled={s.isBooked}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-md border transition ${
                    s.isBooked
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : selectedTime === s.time
                      ? "bg-[#FFD60A] text-black border-transparent"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {s.time}
                  {s.isBooked && (
                    <span className="text-xs text-red-500 ml-1">Sold out</span>
                  )}
                </button>
              ))}
          </div>

          <p className="text-xs text-gray-400 mb-6">
            All times are in IST (GMT +5:30)
          </p>

          {/* About Section */}
          <h4 className="font-medium mb-3 text-sm sm:text-base">About</h4>
          <div className="p-3 sm:p-4 bg-gray-50 rounded-md text-sm sm:text-base text-gray-600">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </div>
        </div>
              {/* ---------- RIGHT SIDE (CARD) ---------- */}
      <div className="lg:sticky lg:top-24 self-start">
        <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6 w-full max-w-sm mx-auto lg:mx-0">
          <div className="space-y-4 sm:space-y-5">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Starts at</span>
              <span className="font-medium text-black">₹{exp.price}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex justify-between text-sm text-gray-600 items-center">
              <span>Quantity</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border rounded-md text-base disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-sm sm:text-base">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border rounded-md text-base disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>

            <hr />

            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-[#FFD60A] text-black font-medium py-2 sm:py-3 rounded-md mt-3 hover:bg-yellow-400 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
