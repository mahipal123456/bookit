const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },

 about: {
    type: String, // A short description or details about the experience
    required: true,
  },
  availableDates: {
    type: [String], // e.g. ["2025-10-22", "2025-10-23"]
    required: true,
  },

  
  availableTimes: {
    type: [String], // e.g. ["07:00 am", "09:00 am", "11:00 am"]
    required: true,
  },

  
  bookedSlots: [
    {
      date: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
});
const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
