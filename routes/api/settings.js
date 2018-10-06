const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Setting model
const Setting = require("../../models/Setting");

// @route   GET api/settings/test
// @desc    Tests settings route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Settings Works" }));

// @route   GET api/settings
// @desc    Get logged in user settings
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Setting.findOne({ user: req.user.id }).then(setting => {
      if (!setting) return res.status(404).json({ error: "No settings found" });
      res.json(setting);
    });
  }
);

// @route   POST api/settings
// @desc    Create settings for current user
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const settingFields = {
      user: req.user.id,
      general: {}
    };

    new Setting(settingFields).save().then(setting => {
      res.json({ setting });
    });
  }
);

// @route   POST api/settings/device
// @desc    Add device
// @access  Private
router.post(
  "/device",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Setting.findOne({ user: req.user.id })
      .then(setting => {
        const newDevice = {
          token: req.body.token,
          name: req.body.name,
          user: req.user.id
        };

        // Add to devices array
        setting.devices.unshift(newDevice);

        // Save
        setting
          .save()
          .then(setting =>
            res.json({ success: "Device added with success", setting: setting })
          );
      })
      .catch(err =>
        res
          .status(404)
          .json({ settingNotFound: "No settings found", error: err })
      );
  }
);

// @route   DELETE api/settings/device/:id
// @desc    Remove device
// @access  Private
router.delete(
  "/device/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Setting.findOne({ user: req.user.id })
      .then(setting => {
        // Check to see if device exists
        if (
          setting.devices.filter(
            device => device._id.toString() === req.params.id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ devicenotexists: "Device does not exist" });
        }

        // Get remove index
        const removeIndex = setting.devices
          .map(item => item._id.toString())
          .indexOf(req.params.id);

        // Splice device out of array
        setting.devices.splice(removeIndex, 1);

        setting
          .save()
          .then(setting =>
            res.json({
              success: "Device removed with success",
              setting: setting
            })
          );
      })
      .catch(err =>
        res.status(404).json({ settingnotfound: "No settings found" })
      );
  }
);

module.exports = router;

// Load settings on login and save them on localstorage
// When edit settings logout and log back in alert
// Save ips in settings ( mqtt, blynk, ... )
