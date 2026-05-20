import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

//
// GET ALL EMPLOYEES
//
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//
// CREATE EMPLOYEE
//
router.post("/", async (req, res) => {
  try {
    const employee = new Employee({
      name: req.body.name,
      role: req.body.role,
      department: req.body.department,
    });

    const savedEmployee = await employee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//
// UPDATE EMPLOYEE
//
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//
// DELETE EMPLOYEE
//
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;