const mongoose = require('mongoose');
require("dotenv").config();
const DB = process.env.MONGO_URI;
console.log(DB)
mongoose.connect(DB)
.then(()=>console.log("Connection Successfull"))
.catch((err)=>console.log(err));