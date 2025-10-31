import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const success = state?.success;
  const booking = state?.booking;

  return (
    <div className="container-max text-center mt-24">
      {success ? (
        <>
          <div className="inline-block rounded-full bg-green-500 p-5 mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>

          <h2 className="text-2xl font-semibold mb-2">Booking Confirmed</h2>
          <p className="text-gray-600 mb-6">Ref ID: {booking?._id || "HUF56&SO"}</p>

          <div className="mt-4">
            <div className="mx-auto w-max bg-gray-100 rounded-md shadow-sm">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 text-sm text-gray-700"
              >
                Back to Home
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Booking Failed</h2>
          <p className="text-gray-600 mb-6">Please try again later.</p>
          <button onClick={() => navigate(-1)} className="bg-hdGray-100 px-4 py-2 rounded-md">Back</button>
        </>
      )}
    </div>
  );
}
