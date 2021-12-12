require("dotenv").config();

const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("TwitterToken ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.jwtSecretKey);
        return user;
      } catch (e) {
        throw new AuthenticationError("Invalid/Expired Token...");
      }
    } else {
      throw new Error("Authentication token is invalid...");
    }
  } else {
    throw new Error("Authorization header must be provided...");
  }
};
