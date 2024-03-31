const mongoose = require("mongoose");

const assignBin  = new mongoose.Schema({
  binId: {
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
  date: {
    type: String,
    required: String,
  },
 
});


const driverAssignBin = mongoose.model("adminactions", assignBin );
module.exports = driverAssignBin;
