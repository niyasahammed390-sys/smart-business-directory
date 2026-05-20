import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

//
// GET ALL ATTENDANCE
//
router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//
// CREATE ATTENDANCE
//
router.post("/", async (req, res) => {
  try {
    const attendance = new Attendance({
      employeeId: req.body.employeeId,
      employeeName: req.body.employeeName,
      status: req.body.status,
      date: req.body.date,
    });

    const savedAttendance =
      await attendance.save();

    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

export default router;