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
  console.log(req.body);
});

module.exports = router;
