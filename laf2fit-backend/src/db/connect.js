const config = require("config");
const mongoose = require("mongoose");

module.exports = async () => {
  const dbConnString = config.get("db.connString");

  return mongoose.connect(dbConnString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
