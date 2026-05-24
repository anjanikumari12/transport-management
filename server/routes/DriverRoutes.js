const express = require("express");

const router = express.Router();

const {
  createDriver,
  getDrivers,
} = require("../controllers/driverController");

router.post("/", createDriver);

router.get("/", getDrivers);

module.exports = router;