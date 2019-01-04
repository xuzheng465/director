var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.get("/searchByTag/:tag", (req, res) => {
  const rTag = req.params.tag;

  pool.connect().then(client => {
    const sql =
      "select * from rule where rst = 't' and rtag like $1 order by rid";
    const value = ["%" + rTag + "%"];
    return client.query(sql, value).then(rulesRes => {
      client.release();
      res.send(JSON.stringify(rulesRes.rows));
    });
  });
});

module.exports = router;
