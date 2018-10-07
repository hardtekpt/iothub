const express = require("express");
const router = express.Router();

// @route   GET api/assistant/test
// @desc    Tests assistant route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Assistant Works" }));

// @route   POST api/assistant
// @desc    Control trough google assistant
// @access  Private
router.post("/", (req, res) => {
  res.json({ device: req.body.device, power: req.body.power });
});

module.exports = router;
