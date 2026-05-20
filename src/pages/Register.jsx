import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  role: "employee",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      await API.post(
        "/auth/register",
        formData
      );

      alert("Registration successful");

      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-slate-800">
          Register
        </h1>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-2xl px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-2xl px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-2xl px-4 py-3"
          />
        <select
  name="role"
  onChange={handleChange}
  className="w-full border border-slate-300 rounded-2xl px-4 py-3"
>
  <option value="employee">Employee</option>
  <option value="admin">Admin</option>
</select>
          <button
            onClick={handleRegister}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}