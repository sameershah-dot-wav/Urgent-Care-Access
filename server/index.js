const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const apiPort = 3000;

const db = require("./db");
const patientRouter = require("./routes/patient-router");
const hospitalRouter = require("./routes/hospital-router")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", patientRouter);
app.use("/api", hospitalRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
