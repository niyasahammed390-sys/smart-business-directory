import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Employees", path: "/employees" },
    { name: "Settings", path: "/settings" },
    { name: "Login", path: "/login" },
    {
  name: "Attendance",
  path: "/attendance",
},
{
  name: "Salary",
  path: "/salary",
},
  ];
  const logout = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  navigate("/login");
};
<div className="mt-10">
  <button
    onClick={logout}
    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl"
  >
    Logout
  </button>
</div>
const downloadSlip = (salary) => {
  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "Smart Business Directory",
    20,
    20
  );

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

  doc.text(
    `Generated On: ${new Date().toLocaleDateString()}`,
    20,
    120
  );

  doc.text(
    "Authorized Signature",
    20,
    160
  );

  doc.line(20, 165, 80, 165);

  doc.save(
    `${salary.employeeName}-SalarySlip.pdf`
  );
};
  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen p-6">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-indigo-400">
          Smart Directory
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Business Management Platform
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-5 py-4 rounded-2xl transition ${
              location.pathname === item.path
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 text-sm text-slate-500">
        Version 1.0
      </div>
    </div>
  );
}