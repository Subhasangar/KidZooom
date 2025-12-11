const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "kids_learning",
    port:3306
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Error:", err);
    }
    else{
    console.log("MySQL Connected!");
    }
});

