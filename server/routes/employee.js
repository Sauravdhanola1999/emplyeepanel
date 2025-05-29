import { Router } from "express";
const router = Router();

let employees = [];
let empIdCounter = 1;

router.get("/", (req, res) => {
  res.json(employees);
});

// POST: Create Employee
router.post("/", (req, res) => {
  const {
    f_Image = "",
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation = "",
    f_gender = "",
    f_Course = [],
    f_Createdate = new Date().toISOString(),
  } = req.body;

  if (!f_Name || !f_Email || !f_Mobile) {
    return res
      .status(400)
      .json({ message: "Name, Email, and Mobile are required" });
  }

  const newEmp = {
    f_Id: empIdCounter++,
    f_Image,
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_gender,
    f_Course,
    f_Createdate,
  };

  employees.push(newEmp);

  return res.status(201).json({
    message: "Employee created successfully",
    employee: newEmp,
  });
});

// GET: Get a single employee by ID
router.get("/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.f_Id === empId);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
});

// PUT: Edit Employee
router.put("/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  const index = employees.findIndex((emp) => emp.f_Id === empId);
  if (index === -1)
    return res.status(404).json({ message: "Employee not found" });
  employees[index] = { ...employees[index], ...req.body };
  res.json(employees[index]);
});

// GET: Get a single employee by ID
router.get("/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.f_Id === empId);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
});

// DELETE: Delete Employee
router.delete("/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  const index = employees.findIndex((emp) => emp.f_Id === empId);
  if (index === -1)
    return res.status(404).json({ message: "Employee not found" });

  const deleted = employees.splice(index, 1);
  res.json(deleted[0]);
});

export default router;
