import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("🎉 Registered! Please login.");
    navigate("/login");
  };

  return (
    <div className="form-box">
      <h2>🍬 Create Sweet Account</h2>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#ff4d94", fontWeight: 600 }}>
          Login
        </a>
      </p>
    </div>
  );
}
