const express = require("express");
const router = express();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const { db } = require("../models/user");
const Driver = require("../models/driver");
const Admin = require("../models/admin");
const Complaints = require("../models/complaints");
const Complaint = require("../models/complaints");
const AdminAction = require("../models/adminAction");
const Bin = require("../models/createBin");
const driverAssignBin = require("../models/assignBin");

//User Register
router.post("/user_register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !cpassword) {
    return res.status(401).json({ errorMessage: "Please Enter All Data" });
  } else if (password !== cpassword) {
    return res.status(400).json({ errorMessage: "Password Should Be Same" });
  } else {
    try {
      const userExist = await User.findOne({ email: email });

      if (userExist) {
        return res.status(422).json({ error: "Email Already Exist" });
      } else if (password != cpassword) {
        return res.status(423).json({ error: "Password are not matched" });
      } else {
        let ran_val = Math.floor(Math.random() * 100 + 1);
        let ran_name = name.slice(0, 4);
        const userId = ran_name + ran_val;
        const user = new User({
          userId,
          name,
          email,
          password,
          cpassword,
        });
        const userRegister = await user.save();
        if (userRegister) {
          res.status(240).json({ message: "User Registered" });
        } else {
          res.status(400).join({ errorMessage: "Registration Failed" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//User Login
router.post("/user_login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errorMessage: "Please Enter Details" });
    } else {
      const userLogin = await User.findOne({ email: email });
      if (!userLogin) {
        res.status(401).json({ errorMessage: "Account Not Exist" });
      } else {
        const userId = userLogin.userId;
        const username = userLogin.name;
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
          res.status(403).json({ errorMessage: "Enter Correct Details" });
        } else {
          const token = await userLogin.generateAuthToken();
          if (token) {
            res.cookie("usertoken", token, {
              expires: new Date(Date.now() + 1000000),
              httpOnly: false,
            });
            res.cookie("username", username, {
              expires: new Date(Date.now() + 1000000),
              httpOnly: false,
            });
            res.cookie("userId", userId, {
              expires: new Date(Date.now() + 1000000),
              httpOnly: false,
            });
            res.status(201).json({ message: "Login Successfull" });
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//Driver Register
router.post("/driver_register", async (req, res) => {
  const { name, email, password, cpassword, licenseid } = req.body;
  if (!name || !email || !password || !cpassword || !licenseid) {
    res.status(401).json({ errorMessage: "Please Enter All Data" });
  } else if (password !== cpassword) {
    res.status(402).json({ errorMessage: "Password Should Be Same" });
  } else {
    try {
      const driverExist = await Driver.findOne({ email: email });

      if (driverExist) {
        return res.status(422).json({ error: "Email Already Exist" });
      } else if (password != cpassword) {
        return res.status(423).json({ error: "Password are not matched" });
      } else {
        let ran_val = Math.floor(Math.random() * 100 + 1);
        let ran_name = name.slice(0, 4);
        const driverId = ran_name + ran_val;
        const driver = new Driver({
          driverId,
          name,
          email,
          password,
          cpassword,
          licenseid,
        });
        const driverRegister = await driver.save();
        if (driverRegister) {
          res.status(240).json({ message: "Driver Registered" });
        } else {
          res.status(400).join({ errorMessage: "Registration Failed" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//Driver Login
router.post("/driver_login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errorMessage: "Please Enter Details" });
    } else {
      const driverLogin = await Driver.findOne({ email: email });
      if (!driverLogin) {
        res.status(401).json({ errorMessage: "Account Not Exist" });
      } else {
        const driverId = driverLogin.driverId;
        const driverName = driverLogin.name;
        const isMatch = await bcrypt.compare(password, driverLogin.password);
        if (!isMatch) {
          res.status(403).json({ errorMessage: "Enter Correct Details" });
        } else {
          const token = await driverLogin.generateAuthToken();
          if (token) {
            res.cookie("drivertoken", token, {
              expires: new Date(Date.now() + 1000000),
              httpOnly: false,
            });
            res.cookie("drivername", driverName, {
              expires: new Date(Date.now() + 1000000),
              httpOnly: false,
            });
            res.cookie("driverId", driverId, {
              expires: new Date(Date.now() + 1000000),
              httpOnly: false,
            });
            res.status(201).json({ message: "Login Successfull" });
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//Admin Register
router.post("/admin_register", async (req, res) => {
  const { email, password, cpassword } = req.body;
  if (!email || !password || !cpassword) {
    res.status(401).json({ errorMessage: "Please Enter All Data" });
  } else if (password !== cpassword) {
    res.status(402).json({ errorMessage: "Password Should Be Same" });
  } else {
    try {
      const adminExist = await Admin.findOne({ email: email });

      if (adminExist) {
        return res.status(422).json({ error: "Email Already Exist" });
      } else if (password != cpassword) {
        return res.status(423).json({ error: "Password are not matched" });
      } else {
        const adminId = Date.now();
        const admin = new Admin({
          adminId,
          email,
          password,
          cpassword,
        });
        const adminRegister = await admin.save();
        if (adminRegister) {
          res.status(240).json({ message: "Admin Registered" });
        } else {
          res.status(400).join({ errorMessage: "Registration Failed" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//Admin Login
router.post("/admin_login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ errorMessage: "Please Enter Details" });
    } else {
      const adminLogin = await Admin.findOne({ email: email });
      if (!adminLogin) {
        res.status(401).json({ errorMessage: "Account Not Exist" });
      } else {
        const isMatch = await bcrypt.compare(password, adminLogin.password);
        if (!isMatch) {
          res.status(403).json({ errorMessage: "Enter Correct Details" });
        } else {
          const adminId = adminLogin.adminId;
          // const name = adminLogin.name;/
          const token = await adminLogin.generateAuthToken();
          if (token) {
            res.cookie("admintoken", token, {
              expires: new Date(Date.now() + 1000000),
              httpOnly: false,
            });
            res.cookie("adminId", adminId, {
              expires: new Date(Date.now() + 1000000),
              httpOnly: false,
            });
            res.status(201).json({ message: "Login Successfull" });
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//User Complaints
router.post("/user_complaints", async (req, res) => {
  const { userId, username, phone, area, locality, date, landmark, note } =
    req.body;
  if (
    !userId ||
    !username ||
    !phone ||
    !area ||
    !locality ||
    !date ||
    !landmark ||
    !note
  ) {
    res.status(401).json({ errorMessage: "Please Enter All Data" });
  } else {
    try {
      let ran_val = Math.floor(Math.random() * 100 + 1);
      let ran_name = username.slice(0, 4);
      const complaintId = ran_name + ran_val;
      const complaint = await Complaint.create({
        complaintId,
        userId,
        username,
        phone,
        area,
        locality,
        date,
        landmark,
        note,
      });
      if (complaint) {
        res.status(200).json({ message: "Complaint Sent" });
      } else {
        res.status(400).join({ errorMessage: "Complaint sent Failed" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//Get Drivers
router.get("/get_drivers", async (req, res) => {
  const data = await Driver.find({});
  try {
    res.status(200).json({
      status: "Success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

//Get Bins
router.get("/get_bins", async (req, res) => {
  const data = await Bin.find({});
  try {
    res.status(200).json({
      status: "Success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

//Get Complaints
router.get("/get_complaints", async (req, res) => {
  const data = await Complaint.find({});
  try {
    res.status(200).json({
      status: "Success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

//Driver assigned action
router.get("/get_driver_actions/:name", async (req, res) => {
  const data = await AdminAction.find({ drivername: req.params.name });
  try {
    res.status(200).json({
      status: "Success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

//Get User Complaints
router.get("/get_user_complaints/:id", async (req, res) => {
  console.log(req.params.id)
  const data = await Complaint.find({ userId: req.params.id });
  console.log(data)
  try {
    res.status(200).json({
      status: "Success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

//Admin Action
router.post("/admin_actions", async (req, res) => {
  const { complaintId, drivername, area, locality, landmark, status, date } =
    req.body;
  if (
    !complaintId ||
    !drivername ||
    !area ||
    !locality ||
    !landmark ||
    !status ||
    !date
  ) {
    res.status(401).json({ errorMessage: "Please Enter All Data" });
  } else {
    try {
      const actionD = new AdminAction({
        complaintId,
        drivername,
        area,
        locality,
        landmark,
        status,
        date,
      });
      const adminAction = await actionD.save();
      if (adminAction) {
        res.status(240).json({ message: "Action Sent to Driver" });
      } else {
        res.status(400).join({ errorMessage: "Action Failed" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//Create Bin
router.post("/create_bin", async (req, res) => {
  const { drivername, area, locality, landmark, date } = req.body;
  if (!drivername || !area || !locality || !landmark || !date) {
    res.status(401).json({ errorMessage: "Please Enter All Data" });
  } else {
    try {
      const binId = Date.now();
      const newBin = new Bin({
        drivername,
        binId,
        area,
        locality,
        landmark,
        date,
      });
      const createBin = await newBin.save();
      if (createBin) {
        res.status(240).json({ message: "Bin Created" });
      } else {
        res.status(400).join({ errorMessage: "Bin is not Created" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//Assign Bin
router.post("/assign_bin", async (req, res) => {
  const { binId, drivername, area, locality, landmark, date } = req.body;
  if (!binId || !drivername || !area || !locality || !landmark || !date) {
    res.status(401).json({ errorMessage: "Please Enter All Data" });
  } else {
    try {
      const newAssignBin = new driverAssignBin({
        binId,
        drivername,
        area,
        locality,
        landmark,
        date,
      });
      const createBin = await newAssignBin.save();
      if (createBin) {
        res.status(240).json({ message: "Bin Assigned to Driver" });
      } else {
        res.status(400).join({ errorMessage: "Bin is not Assigned" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//Update Assign Complaints
router.patch("/update_action/:id", async (req, res) => {
  const { id: _id } = req.params;
  const { drivername, area, locality, landmark, status, date } = req.body;
  try {
    const updateAction = await AdminAction.findByIdAndUpdate(
      _id,
      {
        $set: {
          drivername: drivername,
          area: area,
          locality: locality,
          landmark: landmark,
          status: status,
          date: date,
        },
      },
      { new: true }
    );
    res.status(200).json(updateAction);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
});

// Admin Logout
router.get("/admin_logout", (req, res) => {
  res.clearCookie("admintoken", { path: "/" });
  res.clearCookie("adminName", { path: "/" });
  res.clearCookie("adminId", { path: "/" });
  res.status(200).send("User Logout");
});

// User Logout
router.get("/user_logout", (req, res) => {
  res.clearCookie("usertoken", { path: "/" });
  res.clearCookie("username", { path: "/" });
  res.clearCookie("userId", { path: "/" });
  res.status(200).send("User Logout");
});

// Driver Logout
router.get("/driver_logout", (req, res) => {
  res.clearCookie("drivertoken", { path: "/" });
  res.clearCookie("driverName", { path: "/" });
  res.clearCookie("driverId", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
