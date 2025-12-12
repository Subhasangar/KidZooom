// backend/db.js
require("dotenv").config();
const { Pool } = require("pg");

// Accept either DATABASE_URL or database_url (some tools write lowercase)
const DATABASE_URL = process.env.DATABASE_URL || process.env.database_url || process.env.Postgres || process.env.MYSQL_URL;

if (!DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL is not set in environment variables.");
  process.exit(1);
}

// Mask for logs (don't print full password)
const masked = DATABASE_URL.replace(/(:\/\/.*?:)(.*?)(@)/, (m, p1, p2, p3) => `${p1}*****${p3}`);
console.log("Using DATABASE_URL:", masked);

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.on("error", (err) => {
  console.error("Unexpected PG error:", err);
  process.exit(-1);
});

module.exports = pool;
