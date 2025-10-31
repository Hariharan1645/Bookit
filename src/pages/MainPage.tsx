import { useEffect, useState } from "react";
import api from "../lib/api";
import ExperienceCard from "../components/ExperienceCard";

type Exp = {
  _id: string;
  title: string;
  location?: string;
  price?: number;
  image?: string;
};

export default function MainPage() {
  const [exps, setExps] = useState<Exp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/experiences");
        setExps(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        Loading experiences...
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 mb-16">
      {/* GRID OF EXPERIENCES */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          xl:grid-cols-4 
          gap-x-6 
          gap-y-10
        "
      >
        {exps.map((e) => (
          <ExperienceCard
            key={e._id}
            experience={{
              id: e._id,
              title: e.title,
              location: e.location,
              price: e.price,
              image: e.image,
            }}
          />
        ))}
      </div>

      {/* No Data Case */}
      {exps.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No experiences available yet.
        </div>
      )}
    </main>
  );
}
