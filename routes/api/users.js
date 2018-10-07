const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validatePinLoginInput = require("../../validation/pin-login");
const validateChangePinInput = require("../../validation/change-pin");

// Load User model
const User = require("../../models/User");
// Load Note model
const Note = require("../../models/Note");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users Works" });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.checkPin(req.body.pin, data => {
    if (!data) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        pin: req.body.pin
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.pin, salt, (err, hash) => {
          if (err) throw err;
          newUser.pin = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    } else {
      errors.pin = "Pin already exists";
      return res.status(400).json(errors);
    }
  });
});

// @route   GET api/users/pinlogin
// @desc    Login User with pin only / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validatePinLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const pin = req.body.pin;
  let notMatch = true;

  User.find().then(users => {
    if (isEmpty(users)) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    users.forEach((user, index) => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      bcrypt
        .compare(pin, user.pin)
        .then(isMatch => {
          if (isMatch) {
            notMatch = false;
            // User Matched
            const payload = {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email
            }; // Create JWT Payload

            // Sign Token
            jwt.sign(payload, keys.secretOrKey, (err, token) => {
              return res.json({
                success: true,
                token: "Bearer " + token
              });
            });
          }
        })
        .then(() => {
          if (index === users.length - 1 && notMatch) {
            errors.pin = "Pin incorrect";
            return res.status(400).json(errors);
          }
        });
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      username: req.user.username
    });
  }
);

// @route   POST api/users/changepin
// @desc    Change pin
// @access  Private
router.post(
  "/changepin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChangePinInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPin = req.body.newPin;
    const currPin = req.body.currPin;

    // Check if curr pin match
    User.findById(req.user.id).then(user => {
      if (!user) res.status(404).json({ user: "No user found" });

      User.checkPin(newPin, data => {
        if (data) {
          res.status(400).json({ newPin: "Pin already used" });
        }
      });

      bcrypt.compare(currPin, user.pin).then(isMatch => {
        if (isMatch) {
          // Update pin
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPin, salt, (err, hash) => {
              if (err) throw err;
              const userFileds = {
                pin: hash
              };
              // Update
              User.findOneAndUpdate(
                { _id: req.user.id },
                { $set: userFileds },
                { new: true }
              )
                .then(user =>
                  res.json({ success: "Pin changed with success", user: user })
                )
                .catch(err => console.log(err));
            });
          });
        } else {
          res.status(400).json({ currPin: "Current pin incorrect" });
        }
      });
    });
  }
);

// @route   DELETE api/users/
// @desc    Delete user account
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Remove user
    User.findOneAndRemove({ _id: req.user.id }).then(() => {
      // Remove all user notes
      Note.find({ user: req.user.id })
        .remove()
        .then(() => {
          res.json({ success: true });
        });
    });
  }
);

module.exports = router;

// --> Create default settings on user registration
// --> Create and update settings route
// --> Settings model and validation
