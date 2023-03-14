const mongoose = require("mongoose");
const { MONGODB } = require("../config/constants");

const mongooseLoader = async () => {
  try {
    await mongoose.connect(MONGODB);
    mongoose.set("strictQuery", false);
    console.info("connected to database");
  } catch (error) {
    console.error("connected error");
  }
};

module.exports = mongooseLoader;
