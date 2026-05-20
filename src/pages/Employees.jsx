import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import API from "../services/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
  });

  const [editId, setEditId] = useState(null);
  useEffect(() => {
  fetchEmployees();
}, []);

const fetchEmployees = async () => {
  try {
    const res = await API.get("/employees");

    setEmployees(res.data);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
  localStorage.setItem("employees", JSON.stringify(employees));
}, [employees]);

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Employee
 const addEmployee = async () => {
  if (!formData.name || !formData.role || !formData.department) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await API.post("/employees", formData);

    setEmployees([...employees, res.data]);

    setFormData({
      name: "",
      role: "",
      department: "",
    });
  } catch (error) {
    console.log(error);
  }
};
  // Delete Employee
  const deleteEmployee = async (id) => {
  try {
    await API.delete(`/employees/${id}`);

    setEmployees(employees.filter((emp) => emp._id !== id));
  } catch (error) {
    console.log(error);
  }
};
  // Edit Employee
  const editEmployee = (emp) => {
    setEditId(emp._id);

    setFormData({
      name: emp.name,
      role: emp.role,
      department: emp.department,
    });
  };

  // Update Employee
  const updateEmployee = async () => {
  try {
    const res = await API.put(`/employees/${editId}`, formData);

    const updatedEmployees = employees.map((emp) =>
      emp._id === editId ? res.data : emp
    );

    setEmployees(updatedEmployees);

    setEditId(null);

    setFormData({
      name: "",
      role: "",
      department: "",
    });
  } catch (error) {
    console.log(error);
  }
};
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Employee Management
          </h1>

          <p className="text-slate-500 mt-2">
            Add, Edit, Delete and Manage Employees
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            {editId ? "Edit Employee" : "Add Employee"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-slate-300 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              className="border border-slate-300 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border border-slate-300 rounded-2xl px-4 py-3"
            />
          </div>

          <div className="mt-6">
            {editId ? (
              <button
                onClick={updateEmployee}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-2xl"
              >
                Update Employee
              </button>
            ) : (
              <button
                onClick={addEmployee}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl"
              >
                Add Employee
              </button>
            )}
          </div>
        </div>

        {/* Employee List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {emp.name}
                  </h2>

                  <p className="text-slate-500 mt-2">{emp.role}</p>

                  <p className="text-slate-400">
                    Department: {emp.department}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => editEmployee(emp)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(emp._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}