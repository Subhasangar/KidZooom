const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "kids_learning",
    port:3306,
    connectTimeout: 20000
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Error:", err);
        return;
    }
    console.log("MySQL Connected!");
});

module.exports = db;
