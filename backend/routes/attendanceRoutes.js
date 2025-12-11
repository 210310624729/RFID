const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendanceController");


router.post("/:id", controller.markAttendanceById);

router.get("/", controller.getAllAttendance);


module.exports = router;

