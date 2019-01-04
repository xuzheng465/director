var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.get("/onlyRules", function(req, res) {
  var sqlstr = "select * from rule where rst = 't' order by rid;";
  pool.query(sqlstr, (err, dbres) => {
    res.send(JSON.stringify(dbres.rows));
  });
});

module.exports = router;
