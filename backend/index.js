const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const experienceRoutes = require("./routes/experienceRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
const promoRoutes=require("./routes/promoRoutes");
const ConnectDb=require('./config/DB')
const Experience = require("./models/ExperienceModel");
const app = express();
app.use(cors());
app.use(express.json());
 
// MongoDB Connection
ConnectDb();
// Routes
app.use("/experiences", experienceRoutes);
app.use("/", bookingRoutes);
app.use("/", promoRoutes);
const dummyExperiences =[
  {
    "title": "Kayaking Adventure",
    "location": "Udupi",
    "price": "999",
    "image": "https://images.unsplash.com/photo-1669200719932-bc714aa38684",
    "about": "Enjoy an exciting kayaking adventure through the peaceful backwaters of Udupi with certified guides and safety equipment provided.",
    "availableDates": ["2025-11-01", "2025-11-02", "2025-11-03"],
    "availableTimes": ["07:00 am", "09:00 am", "11:00 am", "01:00 pm"],
    "bookedSlots": [
      { "date": "2025-11-01", "time": "07:00 am" },
      { "date": "2025-11-02", "time": "09:00 am" },
      { "date": "2025-11-03", "time": "11:00 am" }
    ]
  },
  {
    "title": "Nandi Hills Sunrise Trek",
    "location": "Bangalore",
    "price": "899",
    "image": "https://images.unsplash.com/photo-1708785902956-343da7dbd0bc",
    "about": "Witness the breathtaking sunrise from Nandi Hills as you trek with an experienced guide and enjoy a light breakfast at the peak.",
    "availableDates": ["2025-11-05", "2025-11-06", "2025-11-07"],
    "availableTimes": ["04:00 am", "05:00 am", "06:00 am"],
    "bookedSlots": [
      { "date": "2025-11-06", "time": "05:00 am" },
      { "date": "2025-11-07", "time": "06:00 am" }
    ]
  },
  {
    "title": "Coffee Plantation Trail",
    "location": "Coorg",
    "price": "1299",
    "image": "https://images.unsplash.com/photo-1641243079795-7ac81a1c972e",
    "about": "Take a guided walk through the lush coffee estates of Coorg, learn about coffee making, and enjoy a fresh cup brewed from local beans.",
    "availableDates": ["2025-11-08", "2025-11-09", "2025-11-10"],
    "availableTimes": ["08:00 am", "10:00 am", "12:00 pm"],
    "bookedSlots": [
      { "date": "2025-11-08", "time": "10:00 am" },
      { "date": "2025-11-09", "time": "12:00 pm" }
    ]
  },
  {
    "title": "Boat Cruise",
    "location": "Sundarban",
    "price": "999",
    "image": "https://images.unsplash.com/photo-1568151845488-123cfdc5c736",
    "about": "Sail through the mangrove forests of Sundarban and witness the rich biodiversity including crocodiles and birds in their natural habitat.",
    "availableDates": ["2025-11-11", "2025-11-12", "2025-11-13"],
    "availableTimes": ["09:00 am", "11:00 am", "01:00 pm"],
    "bookedSlots": [
      { "date": "2025-11-11", "time": "09:00 am" },
      { "date": "2025-11-12", "time": "01:00 pm" }
    ]
  },
  {
    "title": "Bungee Jumping",
    "location": "Manali",
    "price": "1499",
    "image": "https://images.unsplash.com/photo-1559677624-3c956f10d431",
    "about": "Feel the ultimate adrenaline rush as you leap off a cliff and enjoy the stunning mountain views during your bungee jump experience in Manali.",
    "availableDates": ["2025-11-14", "2025-11-15", "2025-11-16"],
    "availableTimes": ["09:00 am", "11:00 am", "01:00 pm"],
    "bookedSlots": [
      { "date": "2025-11-14", "time": "11:00 am" },
      { "date": "2025-11-15", "time": "01:00 pm" },
      { "date": "2025-11-16", "time": "09:00 am" }
    ]
  },
  {
    "title": "Paragliding Experience",
    "location": "Bir Billing",
    "price": "1999",
    "image": "https://images.unsplash.com/photo-1645221559842-5a542abbb40b",
    "about": "Fly over the scenic landscapes of Bir Billing, the paragliding capital of India, with certified pilots ensuring a safe and thrilling flight.",
    "availableDates": ["2025-11-17", "2025-11-18", "2025-11-19"],
    "availableTimes": ["07:00 am", "09:00 am", "11:00 am"],
    "bookedSlots": [
      { "date": "2025-11-17", "time": "07:00 am" },
      { "date": "2025-11-18", "time": "09:00 am" }
    ]
  },
  {
    "title": "Desert Safari",
    "location": "Jaisalmer",
    "price": "1199",
    "image": "https://images.unsplash.com/photo-1695878868496-fcbd6ef47f57",
    "about": "Experience the golden dunes of Jaisalmer with an adventurous jeep safari followed by a traditional Rajasthani dinner and folk dance.",
    "availableDates": ["2025-11-20", "2025-11-21", "2025-11-22"],
    "availableTimes": ["04:00 pm", "05:30 pm", "06:30 pm"],
    "bookedSlots": [
      { "date": "2025-11-20", "time": "06:30 pm" },
      { "date": "2025-11-21", "time": "05:30 pm" }
    ]
  },
  {
    "title": "Scuba Diving",
    "location": "Goa",
    "price": "1999",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "about": "Explore the underwater beauty of Goa with professional diving instructors and top-quality equipment for a safe and memorable experience.",
    "availableDates": ["2025-11-23", "2025-11-24", "2025-11-25"],
    "availableTimes": ["08:00 am", "10:00 am", "12:00 pm"],
    "bookedSlots": [
      { "date": "2025-11-23", "time": "08:00 am" },
      { "date": "2025-11-24", "time": "10:00 am" },
      { "date": "2025-11-25", "time": "12:00 pm" }
    ]
  }
];



// Insert dummy data only once (if DB is empty)
mongoose.connection.once("open", async () => {
  const count = await Experience.countDocuments();
  if (count === 0) {
    await Experience.insertMany(dummyExperiences);
    console.log("🌟 Dummy experiences added successfully!");
  } else {
    console.log("✅ Experiences already exist, skipping seeding.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
