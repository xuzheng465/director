const { Pool } = require("pg");

var pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "freestyle",
  password: "123456",
  port: 5431
});

module.exports = pool;
