const mongoose = require("mongoose");
const CONFIG = require("../config/constants");

const mongooseLoader = async () => {
  try {
    await mongoose.connect(CONFIG.MONGODB);
    mongoose.set("strictQuery", true);
    console.info("connected to database");
  } catch (error) {
    console.error("connected error");
  }
};

module.exports = mongooseLoader;
