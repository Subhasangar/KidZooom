// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // postgres pool

const app = express(); // ✅ app FIRST

// ---- CORS ----
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://kid-zooom.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());

// ---- TEST ROUTE ----
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, message: "Backend is working 🚀" });
});

// ---- REGISTER ----
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const query =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";

    const result = await pool.query(query, [name, email, password]);

    res.json({
      message: "User registered successfully",
      id: result.rows[0].id
    });
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// ---- LOGIN ----
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query =
      "SELECT id, name, email FROM users WHERE email=$1 AND password=$2";

    const result = await pool.query(query, [email, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---- START SERVER ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
