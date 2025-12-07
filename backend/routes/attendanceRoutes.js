const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendanceController");


router.post("/:id", controller.markAttendanceById);

router.get("/", controller.getAllAttendance);

router.get("/student/:id", controller.getStudentAttendance);

router.get("/present-count/:id", controller.getPresentCount);

router.get("/present-count", controller.getAllPresentCounts);

module.exports = router;
