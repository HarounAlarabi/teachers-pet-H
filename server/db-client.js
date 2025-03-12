const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false 
  } : false,
});

<<<<<<< HEAD
client
  .connect()

  .then(() => console.log("Connected to database"));
=======
client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

module.exports = client;
>>>>>>> 1fc047be9109bc1ffca7cc32f26146dba92abaf8
