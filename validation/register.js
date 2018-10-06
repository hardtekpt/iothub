const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.pin = !isEmpty(data.pin) ? data.pin : "";
  data.pin2 = !isEmpty(data.pin2) ? data.pin2 : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(data.pin, { min: 4, max: 4 })) {
    errors.pin = "Pin must be 4 characters";
  }

  if (Validator.isEmpty(data.pin)) {
    errors.pin = "Pin field is required";
  }

  if (Validator.isEmpty(data.pin2)) {
    errors.pin2 = "Pin confirmation field is required";
  }

  if (!Validator.equals(data.pin, data.pin2)) {
    errors.pin2 = "Pins must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
