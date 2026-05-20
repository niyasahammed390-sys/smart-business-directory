import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const empRes = await API.get("/employees");
      const attRes = await API.get("/attendance");
      const salRes = await API.get("/salaries");

      setEmployees(empRes.data);
      setAttendance(attRes.data);
      setSalaries(salRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Attendance Stats
  const presentCount = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  // Salary Stats
  const totalSalary = salaries.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const paidSalary = salaries
    .filter((item) => item.status === "Paid")
    .reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );

  const pendingSalary = salaries
    .filter((item) => item.status === "Pending")
    .reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );

  // Chart Data
  const attendanceData = [
    {
      name: "Present",
      value: presentCount,
    },
    {
      name: "Absent",
      value: absentCount,
    },
  ];

  const salaryData = [
    {
      name: "Paid",
      amount: paidSalary,
    },
    {
      name: "Pending",
      amount: pendingSalary,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-4xl font-bold">
            Dashboard Analytics
          </h1>

          <p className="text-slate-500 mt-2">
            Business insights & HR analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-indigo-600 text-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl">Employees</h2>

            <p className="text-5xl font-bold mt-4">
              {employees.length}
            </p>
          </div>

          <div className="bg-green-500 text-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl">Present</h2>

            <p className="text-5xl font-bold mt-4">
              {presentCount}
            </p>
          </div>

          <div className="bg-red-500 text-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl">Absent</h2>

            <p className="text-5xl font-bold mt-4">
              {absentCount}
            </p>
          </div>

          <div className="bg-yellow-500 text-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl">
              Total Salary
            </h2>

            <p className="text-4xl font-bold mt-4">
              ₹ {totalSalary}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Pie Chart */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              Attendance Overview
            </h2>

            <div className="h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={attendanceData}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >
                    {attendanceData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Salary Bar Chart */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              Salary Analytics
            </h2>

            <div className="h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={salaryData}>
                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6">
            Recent Attendance
          </h2>

          <div className="space-y-4">
            {attendance
              .slice(-5)
              .reverse()
              .map((item) => (
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
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}