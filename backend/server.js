const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

app.listen(2000, () => {
  console.log(`Server running on port 2000`);
});
