import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { experience, quantity, selectedDate, selectedTime, subtotal, tax, total } = state || {};

  const [finalTotal, setFinalTotal] = useState(total ?? 0);
  const [promoMessage, setPromoMessage] = useState("");
  const [promoError, setPromoError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const agree = watch("agree");

  // Submit handler
  const onSubmit = async (data) => {
    if (!agree) {
      setPromoError("Please agree to the terms before proceeding.");
      return;
    }

    const payload = {
      name: data.name,
      email: data.email,
      experienceId: experience?._id,
      date: selectedDate,
      time: selectedTime,
      quantity,
      total: finalTotal,
      promoCode: data.promo || "",
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});


      const result = await res.json();
      if (res.ok) {
        navigate("/result", { state: { refId: result.booking?._id || "N/A" } });
      } else {
        setPromoError(result.message || "Failed to complete booking.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setPromoError("Server error occurred. Try again later.");
    }
  };

  const applyPromo = async (code) => {
    if (!code) {
      setPromoError("Please enter a promo code.");
      setPromoMessage("");
      return;
    }

    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/promo/validate`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ code }),
});


      const data = await res.json();
      if (res.ok) {
        let newTotal = total;
        if (data.promo.type === "percent") {
          newTotal = total - (total * data.promo.value) / 100;
        } else if (data.promo.type === "flat") {
          newTotal = total - data.promo.value;
        }
        setFinalTotal(newTotal > 0 ? newTotal : 0);
        setPromoMessage(data.message);
        setPromoError("");
      } else {
        setPromoError(data.message);
        setPromoMessage("");
      }
    } catch (error) {
      console.error("Promo error:", error);
      setPromoError("Server error while applying promo code.");
      setPromoMessage("");
    }
  };

  if (!experience) return <p className="text-center mt-10">No booking found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-[#161616] hover:text-[#656565] mb-6 font-semibold"
      >
        ← Checkout
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* LEFT FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 bg-[#EFEFEF] p-6 rounded-xl shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)] h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#5B5B5B]">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
                className="w-full text-[ #727272] mt-1 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#FFD643] bg-[#DDDDDD]"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-sm text-[#5B5B5B]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="Your email"
                className="w-full mt-1  text-[ #727272] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#FFD643] bg-[#DDDDDD]"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <input
              {...register("promo")}
              placeholder="Promo code"
              className="flex-1 text-[ #727272] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#FFD643] bg-[#DDDDDD]"
            />
            <button
              type="button"
              onClick={() => applyPromo(watch("promo"))}
              className="bg-[#161616] text-[#F9F9F9] px-4 py-2 rounded hover:bg-[#333333]"
            >
              Apply
            </button>
          </div>

          {promoMessage && <p className="text-red-500 text-sm mt-1">{promoMessage}</p>}
          {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}

          <div className="mt-4 flex items-center gap-2">
            <input type="checkbox" {...register("agree", { required: true })} />
            <label className="text-sm text-[#5B5B5B]">
              I agree to the terms and safety policy <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.agree && <p className="text-red-500 text-xs mt-1">You must agree to continue</p>}

          <p className="text-xs text-[#5B5B5B] mt-6">
            By clicking Pay and Confirm you agree to our terms and payment policy.
          </p>
        </form>

        {/* RIGHT SUMMARY */}
        <div className="w-full md:w-80 bg-[#EFEFEF] rounded-xl p-5 shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2 text-[#656565] text-sm md:text-base">
              <span>Experience</span>
              <span className="font-medium text-[#161616]">{experience.title}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-[#656565] text-sm md:text-base">
              <span>Date</span>
              <span className="text-[#161616]">{selectedDate}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-[#656565] text-sm md:text-base">
              <span>Time</span>
              <span className="text-[#161616]">{selectedTime}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-[#656565] text-sm md:text-base">
              <span>Qty</span>
              <span className="text-[#161616]">{quantity}</span>
            </div>

            <div className="flex justify-between items-center mb-2 text-[#656565] text-sm md:text-base">
              <span>Subtotal</span>
              <span className="text-[#161616]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-[#656565] text-sm md:text-base">
              <span>Taxes</span>
              <span className="text-[#161616]">₹{tax}</span>
            </div>

            <hr className="my-3 border-gray-300" />

            <div className="flex justify-between font-semibold text-lg text-[#161616]">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => handleSubmit(onSubmit)()}
              disabled={!agree}
              className={`mt-3 w-full py-2 rounded text-sm font-semibold transition ${
                !agree
                  ? "bg-[#D7D7D7] text-[#7F7F7F] cursor-not-allowed"
                  : "bg-[#FFD643] hover:bg-[#e6c138] text-[#161616]"
              }`}
            >
              Pay and Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
