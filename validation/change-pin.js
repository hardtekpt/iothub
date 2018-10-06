const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateChangePinInput(data) {
  let errors = {};

  data.currPin = !isEmpty(data.currPin) ? data.currPin : "";
  data.newPin = !isEmpty(data.newPin) ? data.newPin : "";
  data.newPin2 = !isEmpty(data.newPin2) ? data.newPin2 : "";

  if (!Validator.isLength(data.currPin, { min: 4, max: 4 })) {
    errors.currPin = "Pin must be 4 numbers";
  }

  if (!Validator.isLength(data.newPin, { min: 4, max: 4 })) {
    errors.newPin = "Pin must be 4 numbers";
  }

  if (Validator.isEmpty(data.currPin)) {
    errors.currPin = "Current pin field is required";
  }

  if (Validator.isEmpty(data.newPin)) {
    errors.newPin = "New pin field is required";
  }

  if (!Validator.equals(data.newPin, data.newPin2)) {
    errors.newPin2 = "Pins must match";
  }

  if (Validator.isEmpty(data.newPin2)) {
    errors.newPin2 = "Confirm pin field is required";
  }

  if (Validator.equals(data.currPin, data.newPin)) {
    errors.currPin = "New pin is the same as the current pin";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
