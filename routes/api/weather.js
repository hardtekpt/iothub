const express = require("express");
const router = express.Router();
const passport = require("passport");
const weather = require("yahoo-weather");

// @route   GET api/weather/test
// @desc    Tests weather route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Settings Works" }));

// @route   GET api/weather
// @desc    Get weather info
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    weather("Lisbon")
      .then(info => {
        const weather = {
          wind: info.wind,
          atmosphere: info.atmosphere,
          astronomy: info.astronomy,
          condition: info.item.condition,
          forecast: [
            info.item.forecast[0],
            info.item.forecast[1],
            info.item.forecast[2],
            info.item.forecast[3]
          ],
          units: info.units,
          location: info.location,
          title: info.item.title
        };

        //console.log(weather);
        res.json(weather);
      })
      .catch(err => {
        res.json.status(400).json(err);
      });
  }
);

module.exports = router;
