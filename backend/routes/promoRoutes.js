const express = require("express");
const router = express.Router();

// Dummy promo codes
const promoCodes = {
  SAVE10: { type: "percent", value: 10 },
  FLAT100: { type: "flat", value: 100 },
};

// POST /promo/validate → Validate promo code
router.post("/promo/validate", (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: "Please enter a promo code." });

  const promo = promoCodes[code.toUpperCase()];
  if (!promo) return res.status(404).json({ message: "Invalid promo code." });

  res.json({ message: "Promo code applied successfully!", promo });
});

module.exports = router;
