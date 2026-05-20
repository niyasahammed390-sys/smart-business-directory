import express from "express";
import Salary from "../models/Salary.js";

const router = express.Router();

//
// GET ALL SALARIES
//
router.get("/", async (req, res) => {
  try {
    const salaries = await Salary.find();

    res.json(salaries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//
// CREATE SALARY
//
router.post("/", async (req, res) => {
  try {
    const salary = new Salary({
      employeeId: req.body.employeeId,
      employeeName: req.body.employeeName,
      amount: req.body.amount,
      month: req.body.month,
      status: req.body.status,
    });

    const savedSalary = await salary.save();

    res.status(201).json(savedSalary);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//
// UPDATE SALARY STATUS
//
router.put("/:id", async (req, res) => {
  try {
    const updatedSalary =
      await Salary.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedSalary);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

export default router;