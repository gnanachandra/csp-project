const mongoose = require("mongoose");

const adminActionSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    required: true,
  },
  drivername: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: String,
  },
  locality: {
    type: String,
    required: String,
  },
  landmark: {
    type: String,
    required: String,
  },
  status: {
    type: String,
    required: String,
  },
  date: {
    type: String,
    required: String,
  },
});

const AdminAction = mongoose.model("AdminActions", adminActionSchema);
module.exports = AdminAction;
