import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../lib/api";
import ExperienceCard from "../components/ExperienceCard";

// Helper hook to get query params
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const query = useQuery();
  const q = query.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/experiences?search=${encodeURIComponent(q)}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [q]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-16">
      {/* Heading */}
      <h2 className="text-lg sm:text-2xl font-semibold mb-6 text-gray-900">
        Search results for <span className="text-indigo-600">“{q}”</span>
      </h2>

      {/* Loading state */}
      {loading ? (
        <div className="py-10 text-gray-500 text-center text-base sm:text-lg">
          🔍 Searching experiences...
        </div>
      ) : results.length === 0 ? (
        <div className="py-10 text-gray-600 text-center text-base sm:text-lg">
          No experiences found. Try another search.
        </div>
      ) : (
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-x-8 
            gap-y-10
          "
        >
          {results.map((r) => (
            <ExperienceCard
              key={r._id}
              experience={{
                id: r._id,
                title: r.title,
                location: r.location,
                price: r.price,
                image: r.image,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
