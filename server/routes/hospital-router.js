const express = require("express")

const HospitalController = require("../controller/hospital-controller");

const router = express.Router();



router.post("/hospital/create", HospitalController.createHospital);

router.get("/hospitals/list", HospitalController.getHospitals);

module.exports = router;
