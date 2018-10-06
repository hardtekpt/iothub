const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  iat: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);

module.exports.checkPin = function(pin, callback) {
  User.find().then(users => {
    users.forEach((user, index) => {
      bcrypt.compare(pin, user.pin).then(isMatch => {
        if (isMatch) {
          // User Matched
          callback(true);
        } else if (index === users.length - 1) {
          callback(false);
        }
      });
    });
  });
};
