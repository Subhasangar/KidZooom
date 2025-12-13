import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://kidzooom-backend.onrender.com", {
        email,
        password
      });

      alert(res.data.message);
      window.location.href = "/home";   
    } catch (err) {
      alert("Login failed ❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[400px]">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Welcome Kids! 🧸📚
        </h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded mb-3"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded mb-3"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-xl"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          New here? <Link to="/register" className="text-blue-700 underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
