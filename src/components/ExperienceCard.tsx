import { useNavigate } from "react-router-dom";

type Props = {
  experience: {
    id: string;
    title: string;
    location?: string;
    price?: number;
    image?: string;
  };
};

export default function ExperienceCard({ experience }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${experience.id}`)} // ✅ use correct route
      className="
        bg-white shadow-md hover:shadow-lg transition-all cursor-pointer 
        rounded-xl overflow-hidden flex flex-col
        w-full max-w-[280px] mx-auto
      "
    >
      {/* ---------- Image Section ---------- */}
      <div className="relative w-full h-[180px] sm:h-[190px] md:h-[200px] lg:h-[210px] overflow-hidden">
        <img
          src={experience.image || "/src/assets/sample1.jpg"}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* ---------- Text Content ---------- */}
      <div className="flex flex-col justify-between flex-1 p-3 sm:p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm sm:text-base font-medium text-gray-900 leading-tight line-clamp-2">
              {experience.title}
            </h3>
            <span className="px-2 py-1 text-[10px] sm:text-xs bg-gray-100 text-gray-600 rounded-md whitespace-nowrap">
              {experience.location || "Unknown"}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-600 leading-snug line-clamp-2">
            Curated small-group experience. Certified guide. Safety first with gear included.
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-[11px] sm:text-xs text-gray-600">From </span>
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              ₹{experience.price ?? "—"}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent card click conflict
              navigate(`/details/${experience.id}`);
            }}
            className="
              px-3 py-1.5 sm:px-4 sm:py-1.5 
              text-xs sm:text-sm bg-yellow-400 
              rounded-md font-medium hover:bg-yellow-300 transition
            "
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
