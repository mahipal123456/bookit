const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Experience = require("../models/ExperienceModel");

router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid experience ID format." });
  }

  try {
    const experience = await Experience.findById(id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });
    res.json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});


module.exports = router;
