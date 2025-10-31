const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  promoCode: { type: String },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
