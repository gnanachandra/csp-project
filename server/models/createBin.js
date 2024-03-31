const mongoose = require("mongoose");

const createBin = new mongoose.Schema({
  binId: {
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


const Bin = mongoose.model("Bin", createBin);
module.exports = Bin;
