// const { Client } = require("pg");

// const client = new Client({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   ssl: {
//     rejectUnauthorized: true,
//   },
// });

// client.connect(function (err) {
//   if (err) throw err;
// });

// module.exports = client;
const { Client } = require("pg");

// Use DATABASE_URL if set (for Render), else use individual variables (for local dev)
const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Required for Render
      },
    }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // Omit SSL for local development
    };

const client = new Client(connectionConfig);

client
  .connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("Connection error:", err.stack));

module.exports = client;
