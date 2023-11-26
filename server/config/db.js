const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected:${connect.connection.host}`.bgMagenta.underline
    );
  } catch (error) {
    console.log(`MongoDB Connection error:${error.message}`.bgRed.bold);
    process.exit();
  }
};

module.exports = connectMongoDB;
