const mongoose = require("mongoose");

const db_conection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONECTION);

    console.log("DB ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error in the Database connection");
  }
};

module.exports = {
  db_conection,
};
