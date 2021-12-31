const Hospital = require("../models/hospital-model");

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


createHospital = async (req, res) => {

  // check("name", "Please Enter a Valid Username")
  // .not()
  // .isEmpty(),
  // check("postcode", "Please enter a valid postcode").not().isEmpty(),
  // check("password", "Please enter a valid password").isLength({
  //     min: 6
  // })
  
      const errors = validationResult(req); //extracts the validation errors from a request and makes them available in a Result object
      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      const {
        name,
        postcode,
        password,
      } = req.body;

      console.log(req.body)

      try {
        let hospital = await Hospital.findOne({
          name
        });
        if (hospital) {
          return res.status(400).json({
            msg: "Hospital already registered"
          });
        }

        hospital = new Hospital({
          name,
          postcode,
          password
        });

        const salt = await bcrypt.genSalt(10);
        hospital.password = await bcrypt.hash(password, salt);

        await hospital.save();
        

        const payload = {
          hospital: {
              id: hospital.id
          }
        };

        jwt.sign(
          payload,
          "randomString", {
            expiresIn: 10000
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        
        );
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
      }
  }



  loginHospital = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, postcode, password } = req.body;

    try {
      let hospital = await Hospital.findOne({
        name
      });
      if (!hospital)
        return res.status(400).json({
          message: "Hospital not registered"
        });

        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });

          const payload = {
            hospital: {
              id: hospital.id
            }
          };

          jwt.sign(
            payload,
            "randomString",
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token
              });
            }
          );
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Server Error"
      });
    } 
  }

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

  module.exports = {createHospital, getHospitals, loginHospital};