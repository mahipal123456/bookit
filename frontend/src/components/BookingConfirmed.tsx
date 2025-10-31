import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

interface LocationState {
  refId?: string;
}

const BookingConfirmed: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const refId = state?.refId || "N/A";

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-center pt-32">
      {/* ✅ Green Circle with Tick */}
      <div className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
        <Check size={48} className="text-white" strokeWidth={3} />
      </div>

      <h1 className="text-2xl font-semibold mb-2 text-gray-900">
        Booking Confirmed
      </h1>

      <p className="text-gray-700 mb-6">
        Ref ID:{" "}
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-mono">
          {refId}
        </span>
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default BookingConfirmed;
