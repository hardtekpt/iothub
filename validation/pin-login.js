const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePinLoginInput(data) {
  let errors = {};

  data.pin = !isEmpty(data.pin) ? data.pin : "";

  if (!Validator.isLength(data.pin, { min: 4, max: 4 })) {
    errors.pin = "Pin must be 4 numbers";
  }

  if (Validator.isEmpty(data.pin)) {
    errors.pin = "Pin field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
