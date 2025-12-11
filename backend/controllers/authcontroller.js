const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
            if (err) return res.status(400).json({ message: "Email already exists!" });

            res.json({ message: "User registered successfully!" });
        }
    );
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, rows) => {
            if (err || rows.length === 0) {
                return res.status(400).json({ message: "User not found" });
            }

            const user = rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Wrong password" });
            }

            const token = jwt.sign({ id: user.id }, "SECRET123", { expiresIn: "1d" });

            res.json({
                message: "Login successful",
                token,
                user: { id: user.id, name: user.name, email: user.email }
            });
        }
    );
};

