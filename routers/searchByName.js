var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.get("/searchByName/:name", (req, res) => {
  const rname = req.params.name;

  pool.connect().then(client => {
    const sql =
      "select * from rule where rst='t' and rname like $1 order by rid;";
    const value = ["%" + rname + "%"];
    return client.query(sql, value).then(ruleRes => {
      client.release();
      res.send(JSON.stringify(ruleRes.rows));
    });
  });
});

module.exports = router;
