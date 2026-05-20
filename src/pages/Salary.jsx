import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import API from "../services/api";
import jsPDF from "jspdf";

export default function Salary() {
  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    amount: "",
    month: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchEmployees();
    fetchSalaries();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");

      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSalaries = async () => {
    try {
      const res = await API.get("/salaries");

      setSalaries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmployeeChange = (e) => {
    const selectedEmployee = employees.find(
      (emp) => emp._id === e.target.value
    );

    setFormData({
      ...formData,
      employeeId: selectedEmployee._id,
      employeeName: selectedEmployee.name,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSalary = async () => {
    try {
      const res = await API.post(
        "/salaries",
        formData
      );

      setSalaries([...salaries, res.data]);

      alert("Salary added");

      setFormData({
        employeeId: "",
        employeeName: "",
        amount: "",
        month: "",
        status: "Pending",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const markPaid = async (salary) => {
    try {
      const res = await API.put(
        `/salaries/${salary._id}`,
        {
          status: "Paid",
        }
      );

      const updated = salaries.map((item) =>
        item._id === salary._id
          ? res.data
          : item
      );

      setSalaries(updated);
    } catch (error) {
      console.log(error);
    }
  };
  const downloadSlip = (salary) => {
    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text("Smart Business Directory", 20, 20);

    doc.setFontSize(16);

    doc.text("Salary Slip", 20, 40);

    doc.setFontSize(12);

    doc.text(
      `Employee Name: ${salary.employeeName}`,
      20,
      60
    );

    doc.text(
      `Month: ${salary.month}`,
      20,
      75
    );

    doc.text(
      `Salary Amount: ₹ ${salary.amount}`,
      20,
      90
    );

    doc.text(
      `Payment Status: ${salary.status}`,
      20,
      105
    );

    doc.save(
      `${salary.employeeName}-SalarySlip.pdf`
    );
  };


  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-4xl font-bold">
            Salary Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage employee payroll
          </p>
        </div>

        {/* Salary Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            Add Salary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              onChange={handleEmployeeChange}
              className="border border-slate-300 rounded-2xl px-4 py-3"
            >
              <option>Select Employee</option>

              {employees.map((employee) => (
                <option
                  key={employee._id}
                  value={employee._id}
                >
                  {employee.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Salary Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border border-slate-300 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              name="month"
              placeholder="Month"
              value={formData.month}
              onChange={handleChange}
              className="border border-slate-300 rounded-2xl px-4 py-3"
            />

            <button
              onClick={addSalary}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl"
            >
              Add Salary
            </button>
          </div>
        </div>

        {/* Salary History */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6">
            Salary Records
          </h2>

          <div className="space-y-4">
            {salaries.map((salary) => (
              <div
                key={salary._id}
                className="border border-slate-200 rounded-2xl p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold">
                    {salary.employeeName}
                  </h3>

                  <p className="text-slate-500">
                    ₹ {salary.amount}
                  </p>

                  <p className="text-slate-400">
                    {salary.month}
                  </p>
                </div>

                <div className="flex items-center gap-4">
  <span
    className={`px-4 py-2 rounded-xl text-white ${
      salary.status === "Paid"
        ? "bg-green-500"
        : "bg-yellow-500"
    }`}
  >
    {salary.status}
  </span>

  <button
    onClick={() => downloadSlip(salary)}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
  >
    Download PDF
  </button>

  {salary.status === "Pending" && (
    <button
      onClick={() => markPaid(salary)}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
    >
      Mark Paid
    </button>
  )}
</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}