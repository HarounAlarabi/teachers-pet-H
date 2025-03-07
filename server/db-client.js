const { Client } = require("pg");

const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: {
        rejectUnauthorized: false,
      },
    };

const client = new Client(connectionConfig);

client
  .connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("Connection error:", err.stack));

module.exports = client;
