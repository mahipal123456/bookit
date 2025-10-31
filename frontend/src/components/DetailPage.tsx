import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState(""); 

  const tax = 59;

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/experiences/${_id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Experience not found");
        }

        setExperience(data);
        setError("");
      } catch (error) {
        console.error("Error fetching experience:", error);
        setError("Experience not found or invalid ID.");
      }
    };
    fetchExperience();
  }, [_id]);

  // ✅ Error message UI
  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center text-[#161616] min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-3">Oops!</h2>
        <p className="text-[#6C6C6C] mb-4">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#FFD643] hover:bg-[#e6c138] text-[#161616] font-semibold px-4 py-2 rounded-lg transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (!experience) {
    return <p className="p-6 text-center text-[#161616]">Loading...</p>;
  }

  const subtotal = Number(experience.price) * quantity;
  const total = subtotal + tax;

  const handleConfirm = () => {
    navigate(`/checkout/${_id}`, {
      state: {
        experience,
        quantity,
        selectedDate,
        selectedTime,
        subtotal,
        tax,
        total,
      },
    });
  };

  const isBooked = (date, time) =>
    Array.isArray(experience.bookedSlots) &&
    experience.bookedSlots.some(
      (slot) => slot.date === date && slot.time === time
    );

  return (
    <div className="px-4 md:px-8 py-4 max-w-7xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-[#161616] hover:text-[#656565] mb-6 font-semibold"
      >
        ← Details
      </button>

      <div className="flex flex-col md:flex-row gap-5 md:gap-8">
        {/* ---------- LEFT SECTION ---------- */}
        <div className="flex-1">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full rounded-xl object-cover h-64 md:h-80 shadow-sm"
          />

          <div className="mt-3 md:mt-4">
            <h1 className="text-xl md:text-2xl font-semibold text-[#161616]">
              {experience.title}
            </h1>
            <p className="text-[#6C6C6C] mt-1 leading-relaxed text-sm md:text-base">
              {experience.about}
            </p>
          </div>

          {/* ---------- DATE SELECTION ---------- */}
          <div className="mt-6 md:mt-8">
            <h3 className="font-semibold text-[#161616] mb-2 text-base">
              Choose date
            </h3>
            <div className="flex gap-2 flex-wrap">
              {experience.availableDates?.map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime("");
                  }}
                  className={`px-4 py-2 border rounded-md text-sm transition ${
                    selectedDate === date
                      ? "bg-[#FFD643] text-[#161616] border-[#FFD643]"
                      : "border-gray-300 text-[#838383] hover:bg-gray-100"
                  }`}
                >
                  {new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </button>
              ))}
            </div>
          </div>

          {/* ---------- TIME SELECTION ---------- */}
          <div className="mt-6 md:mt-8">
            <h3 className="font-semibold text-[#161616] mb-2 text-base">
              Choose time
            </h3>
            {!selectedDate ? (
              <p className="text-[#6C6C6C] italic text-sm">
                Please select a date first.
              </p>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {experience.availableTimes?.map((time) => {
                  const booked = isBooked(selectedDate, time);
                  return (
                    <button
                      key={time}
                      onClick={() => !booked && setSelectedTime(time)}
                      disabled={booked}
                      className={`px-4 py-2 border rounded-md text-sm transition ${
                        selectedTime === time
                          ? "bg-[#FFD643] text-[#161616] border-[#FFD643]"
                          : "border-gray-300 text-[#838383]"
                      } ${
                        booked
                          ? "cursor-not-allowed bg-[#CCCCCC] text-[#838383]"
                          : ""
                      }`}
                    >
                      {booked ? (
                        <>
                          {time} <span className="text-xs">Sold out</span>
                        </>
                      ) : (
                        time
                      )}
                    </button>
                  );
                })}
              </div>
            )}
            <p className="text-xs text-[#838383] mt-2">
              All times are in IST (GMT +5:30)
            </p>
          </div>

          {/* ---------- ABOUT SECTION ---------- */}
          <div className="mt-6 md:mt-8">
            <h3 className="font-semibold text-[#161616] mb-2 text-base">
              About
            </h3>
            <p className="text-[#838383] bg-[#EEEEEE] text-sm leading-relaxed p-2">
              {experience.about || "No additional details available."}
            </p>
          </div>
        </div>

        {/* ---------- RIGHT SECTION (PRICE CARD) ---------- */}
        <div className="w-full md:w-80 bg-[#EFEFEF] rounded-xl p-4 md:p-5 shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)] h-fit">
          <div className="flex justify-between mb-2 text-[#656565] text-sm md:text-base">
            <span>Starts at</span>
            <span className="font-medium text-[#161616]">
              ₹{experience.price}
            </span>
          </div>

          <div className="flex justify-between items-center mb-2 text-[#656565] text-sm md:text-base">
            <span>Quantity</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="border px-2 rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-[#161616]">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="border px-2 rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between text-[#656565] text-sm mb-2 md:text-base">
            <span>Subtotal</span>
            <span className="text-[#161616]">₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-[#656565] text-sm mb-1 md:text-base">
            <span>Taxes</span>
            <span className="text-[#161616]">₹{tax}</span>
          </div>

          <hr className="my-3 border-gray-300" />

          <div className="flex justify-between font-semibold text-lg text-[#161616]">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className={`mt-4 w-full font-semibold py-2 rounded-lg transition text-sm ${
              !selectedDate || !selectedTime
                ? "bg-[#D7D7D7] text-[#7F7F7F] cursor-not-allowed"
                : "bg-[#FFD643] hover:bg-[#e6c138] text-[#161616]"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
