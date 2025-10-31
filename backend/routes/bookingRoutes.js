const express = require("express");
const router = express.Router();
const Booking = require("../models/BookingModel");

// POST /bookings → Store booking
router.post("/bookings", async (req, res) => {
  try {
    const { name, email, experienceId, date, time, quantity, total, promoCode } = req.body;

    if (!name || !email || !experienceId || !date || !time || !quantity || !total) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const newBooking = new Booking({ name, email, experienceId, date, time, quantity, total, promoCode });
    await newBooking.save();

    res.status(201).json({ message: "Booking successful!", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
