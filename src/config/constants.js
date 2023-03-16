require("dotenv").config();

const CONFIG = {
  PORT: process.env.PORT,
  MONGODB: process.env.MONGODB,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = CONFIG;
