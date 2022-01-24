const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hospital = new Schema({
    name: {type: String, required: true },
    postcode: {type: String, required: true},
    password: {type: String, required: true},
  });


module.exports = mongoose.model("hospitals", Hospital);