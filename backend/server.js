// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // <-- Postgres pool (backend/db.js)
const nodemailer = require("nodemailer");

const app = express();

// CORS - allow your Vercel domain + localhost for dev
const allowedOrigins = [
  (process.env.FRONTEND_URL && process.env.FRONTEND_URL.trim()) || "https://kid-zooom-a4mw-pvozn1iyx-subhasangars-projects.vercel.app",
  "http://localhost:5173"
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// ---- Test route (checks DB connectivity) ----
app.get("/api/ping", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW() as now");
    res.json({ ok: true, time: rows[0] });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---- Nodemailer setup (use env vars) ----
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // set on Render: EMAIL_USER
    pass: process.env.EMAIL_PASS // set on Render: EMAIL_PASS (app password)
  }
});

// ---- Feedback route ----
app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const mailOptions = {
    from: `"KidZooom Feedback" <${process.env.EMAIL_USER}>`,
    to: process.env.FEEDBACK_TO || process.env.EMAIL_USER, // set FEEDBACK_TO on Render or default to EMAIL_USER
    subject: `New Feedback from ${name}`,
    text: `New feedback from KidZooom:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (err) {
    console.error("Error sending feedback email:", err);
    return res.status(500).json({ error: "Failed to send feedback" });
  }
});

// ---- Auth: register & login using Postgres ----
// Note: In production you should hash passwords (bcrypt). This example keeps same logic as your original but still recommend hashing.
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const insertQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`;
    const { rows } = await pool.query(insertQuery, [name, email, password]);
    return res.json({ message: "User registered!", id: rows[0].id });
  } catch (err) {
    console.error("DB ERROR (register):", err);
    // unique email violation handling
    if (err.code === "23505") return res.status(409).json({ message: "Email already exists" });
    return res.status(500).json({ message: "DB error" });
  }
});

app.post("/login", async (req, res) => {
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

// ---- Start server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} (port ${PORT})`);
});
