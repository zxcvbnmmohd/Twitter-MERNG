var validator = require("validator");
var moment = require("moment");

module.exports.validateRegistration = (
  name,
  username,
  dob,
  email,
  password,
) => {
  const errors = {};
  if (name.trim().length < 1) {
    errors.password = "Enter a valid name...";
  }
  
  if (username.trim().length < 3) {
    errors.password = "Username must be atleast 3 characters long...";
  }
  
  if (moment().diff(moment(dob, "MM-DD-YYYY"), 'years') < 16) {
    errors.dob = "Must be at least 16 years old..."
  }
  
  if (!validator.isAlphanumeric(username)) {
    errors.username = "Username must only contain letters and numbers...";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Invalid Email...";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be atleast 6 characters long...";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports.validateLogin = (username, password) => {
  const errors = {};

  if (!validator.isAlphanumeric(username)) {
    errors.username = "Username must only contain letters and numbers...";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be atleast 6 characters long...";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
