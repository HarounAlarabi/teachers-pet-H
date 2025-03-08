const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL!");

    return client.query("SELECT NOW()");
  })
  .then((result) => {
    console.log("Database test query result:", result.rows[0]);
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
