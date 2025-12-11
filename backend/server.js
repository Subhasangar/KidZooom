const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "kids_learning",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Error:", err);
  } else {
    console.log("MySQL Connected!");
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ssubhasangar@gmail.com",          
    pass: "xgmm fwcp gmmz tbju ",         
  },
});

app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const mailOptions = {
    from: '"KidZooom Feedback" <ssubhasangar@gmail.com>',     
    to: "Subhasangar143@gmail.com",                               
    subject: `New Feedback from ${name}`,
    text: `New feedback from KidZooom:

Name: ${name}
Email: ${email}

Message:
${message}
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (err) {
    console.error("Error sending feedback email:", err);
    return res.status(500).json({ error: "Failed to send feedback" });
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }
    return res.json({ message: "User registered!" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    if (result.length > 0) {
      return res.json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
