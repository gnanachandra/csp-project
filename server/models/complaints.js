const mongoose = require("mongoose");

 
const complaintSchema = new mongoose.Schema({
  complaintId:{
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  note: {
    type: String
  },
});



const Complaint = mongoose.model("user_complaint", complaintSchema);
module.exports = Complaint;
