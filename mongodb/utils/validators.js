var validator = require("validator");

module.exports.validateRegistration = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (!validator.isAlphanumeric(username)) {
    errors.username = "Username must only contain letters and numbers...";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Invalid Email...";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be atleast 6 characters long...";
  }

  if (password !== confirmPassword) {
    errors.password = "Passwords do not match...";
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
