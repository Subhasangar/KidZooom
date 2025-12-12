
// backend/create_tables.js
require("dotenv").config();
const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.error("Please set DATABASE_URL in .env or environment.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function create() {
  try {
    // users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now()
      );
    `);

    // feedback
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now()
      );
    `);

    // stories (example table for your frontend)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stories (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE,
        body TEXT,
        thumbnail TEXT,
        created_at TIMESTAMP DEFAULT now()
      );
    `);

    console.log("✅ Tables created (or already existed).");
    process.exit(0);
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
}

create();
