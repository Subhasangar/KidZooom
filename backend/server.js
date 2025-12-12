// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // <-- Postgres pool (backend/db.js)
const nodemailer = require("nodemailer");

const app = express();

// server.js (replace the top CORS + register/login sections)
const allowedOrigins = [
  (process.env.FRONTEND_URL && process.env.FRONTEND_URL.trim()) || "https://kid-zooom.vercel.app",
  "http://localhost:5173"
];

// Allow exact origin(s)
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    return callback(new Error(msg), false);
  }
}));
app.use(express.json());

// ---- replace register/login routes with /api/ prefix ----
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const insertQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`;
    const { rows } = await pool.query(insertQuery, [name, email, password]);
    return res.json({ message: "User registered!", id: rows[0].id });
  } catch (err) {
    console.error("DB ERROR (register):", err);
    if (err.code === "23505") return res.status(409).json({ message: "Email already exists" });
    return res.status(500).json({ message: "DB error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "All fields required" });

  try {
    const selectQuery = `SELECT id, name, email FROM users WHERE email = $1 AND password = $2 LIMIT 1`;
    const { rows } = await pool.query(selectQuery, [email, password]);
    if (rows.length > 0) {
      return res.json({ message: "Login successful", user: rows[0] });
    }
    return res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    console.error("DB ERROR (login):", err);
    return res.status(500).json({ message: "DB error" });
  }
});

