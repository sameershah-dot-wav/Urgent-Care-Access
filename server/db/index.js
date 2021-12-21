//database configuration for mongoose

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://C1946094:l7JrAIyRu8kXtnKK@cluster0.ssqzo.mongodb.net/patient?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
