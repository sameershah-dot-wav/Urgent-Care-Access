const Hospital = require("../models/hospital-model");

createHospital = (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a hospital",
      });
    }
  
    const hospital = new Hospital(body);
  
    if (!hospital) {
      return res.status(400).json({ success: false, error: err });
    }
  
    hospital
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: hospital._id,
          message: "Hospital created!",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Hospital not created!",
        });
      });
  };

  getHospitals = async (req, res) => {
    await Hospital.find({}, (err, hospitals) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!hospitals.length) {
        return res
          .status(404)
          .json({ success: false, error: `Hospital not found` });
      }
      return res.status(200).json({ success: true, data: hospitals });
    }).catch((err) => console.log(err));
  };

  module.exports = {createHospital, getHospitals}