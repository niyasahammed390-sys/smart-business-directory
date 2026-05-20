import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import API from "../services/api";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");

      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await API.get("/attendance");

      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markAttendance = async (
    employee,
    status
  ) => {
    try {
      const today = new Date()
        .toISOString()
        .split("T")[0];

      const attendanceData = {
        employeeId: employee._id,
        employeeName: employee.name,
        status,
        date: today,
      };

      const res = await API.post(
        "/attendance",
        attendanceData
      );

      setAttendance([...attendance, res.data]);

      alert("Attendance marked");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-4xl font-bold">
            Attendance System
          </h1>

          <p className="text-slate-500 mt-2">
            Mark employee attendance
          </p>
        </div>

        {/* Employee List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                {employee.name}
              </h2>

              <p className="text-slate-500 mt-2">
                {employee.role}
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() =>
                    markAttendance(
                      employee,
                      "Present"
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-2xl"
                >
                  Present
                </button>

                <button
                  onClick={() =>
                    markAttendance(
                      employee,
                      "Absent"
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl"
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6">
            Attendance History
          </h2>

          <div className="space-y-4">
            {attendance.map((item) => (
              <div
                key={item._id}
                className="border border-slate-200 rounded-2xl p-4 flex justify-between"
              >
                <div>
                  <h3 className="font-bold">
                    {item.employeeName}
                  </h3>

                  <p className="text-slate-500">
                    {item.date}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded-xl text-white ${
                      item.status === "Present"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}