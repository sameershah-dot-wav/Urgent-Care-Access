const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Patient = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String, required: true },
});

module.exports = mongoose.model("patients", Patient);