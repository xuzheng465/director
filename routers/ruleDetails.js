var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.get("/ruleDetails/:id", function(req, res) {
  const ruledata = req.params.id;

  pool.connect().then(client => {
    const sql = "select * from rule where rst = 't' and rid = $1;";
    const value = [ruledata];
    return client.query(sql, value).then(rdb => {
      const sql =
        "select c.* from conditions c, rule_condition rc where c.conditionid=rc.conditionid and rc.rule_id=$1;";
      const value = [ruledata];
      return client.query(sql, value).then(condb => {
        //res.end(JSON.stringify(resRes.rows));
        const sql =
          "select a.* from action a, rule_action ra where a.action_id=ra.actionid and ra.ruleid=$1;";
        const value = [ruledata];
        return client.query(sql, value).then(actiondb => {
          var db = {
            rdb: rdb.rows[0],
            cdb: condb.rows,
            adb: actiondb.rows
          };
          client.release();
          res.send(JSON.stringify(db));
        });
      });
    });
  });
});

module.exports = router;
