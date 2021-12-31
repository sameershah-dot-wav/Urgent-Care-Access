const express = require("express")

const HospitalController = require("../controller/hospital-controller");
const auth = require("../middleware/auth")

const router = express.Router();

router.post("/hospital", HospitalController.createHospital);
router.get("/hospitals", HospitalController.getHospitals);
router.post("/hospital/login", HospitalController.loginHospital);
router.get("/hospital/me", auth,  HospitalController.getLoggedInHospital)



module.exports = router;
