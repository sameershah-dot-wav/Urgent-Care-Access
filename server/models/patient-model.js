const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Patient = new Schema(
    {
        name: { type: String, required: true },
        dob: { type: [Date], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('patients', Patient)