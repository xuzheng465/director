var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.get("/ruleHistory", function(req, res) {
  var sqlstr =
    "select rh.*, r.rid from rule_history rh, rule r, rh_ro rr where r.rid=rr.ruleid and rh.rule_h_id=rr.rule_h_id and r.rst='t' order by r.rid;";
  pool.query(sqlstr, (err, dbres) => {
    res.send(JSON.stringify(dbres.rows));
  });
});

module.exports = router;
