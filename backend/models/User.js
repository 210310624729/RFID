const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true }, 
  roll: { type: Number, required: true, unique: true },
  contact: { type: String, required: true },
  address: { type: String, default: "" },
  section: { type: String, default: "" }
 
});

module.exports = mongoose.model("User", UserSchema);
