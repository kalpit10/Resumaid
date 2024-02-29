const express = require("express");
const router = express.Router();
const College = require("../models/colleges");

router.get("/colleges", async (req, res) => {
  try {
    //ONLY FINDING COLLEGES BY NAME
    const colleges = await College.find({}, { _id: 0, name: 1 }).sort({
      name: 1,
    });
    res.json(colleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
