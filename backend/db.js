const { Pool } = require("pg");

const pool = new Pool({
  user: "Payroll",
  host: "localhost",
  database: "postgres",
  password: "mryprcs@2003",
  port: 5432,
});

module.exports = pool;
