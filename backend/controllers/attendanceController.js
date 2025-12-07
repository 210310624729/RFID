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




exports.getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const records = await Attendance.find({ student: id }).populate("student");

    if (!records || records.length === 0) {
      return res.json({ message: "No attendance found for this student" });
    }

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getPresentCount = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Attendance.aggregate([
      { $match: { student: id, status: "Present" } },
      { $count: "totalPresent" }
    ]);

    const totalPresent = result.length ? result[0].totalPresent : 0;

    res.json({ student: id, totalPresent });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAllPresentCounts = async (req, res) => {
  try {
    const result = await Attendance.aggregate([
      { $match: { status: "Present" } },
      {
        $group: {
          _id: "$student",
          totalPresent: { $sum: 1 }
        }
      }
    ]);

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
