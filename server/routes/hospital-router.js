const express = require("express")

const HospitalController = require("../controller/hospital-controller");

const router = express.Router();

router.post("/hospital", HospitalController.createHospital);
router.get("/hospitals", HospitalController.getHospitals);

module.exports = router;
