const Attendance = require("../models/Attendance");


exports.markAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;           
    const { status } = req.body;        

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let record = await Attendance.findOne({ student: id, date: today });

    if (record) {
      record.status = status || "Absent";
      await record.save();
      return res.json({ message: "Attendance updated", record });
    }


    const newRecord = await Attendance.create({
      student: id,
      status: status || "Absent",
      date: today
    });

    res.json({ message: "Attendance saved", newRecord });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("student");
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


