const express = require("express");
const router = express.Router();
const blynk = require("../../blynk/blynk");

// test variable
let test = false;

// @route   GET api/assistant/test
// @desc    Tests assistant route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Assistant Works" }));

// @route   POST api/assistant
// @desc    Control trough google assistant
// @access  Private
router.post("/", (req, res) => {
  res.json({ device: req.body.device, power: req.body.power });
  console.log(req.body.device, req.body.power);
  switch (req.body.device) {
    case "desk":
      break;

    default:
      break;
  }
});

router.get("/:device/:method", (req, res) => {
  switch (req.params.device) {
    case "bed":
      if (req.params.method == "toggle") test = !test;
      res.json(test);
      console.log(test);
      break;
  }
});

module.exports = router;
