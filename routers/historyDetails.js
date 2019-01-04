var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.get("/historyDetails/:historyid", (req, res) => {
  const historyid = req.params.historyid;

  pool.connect().then(client => {
    console.log(historyid);
    const sql =
      "select rh.*, r.rid from rule_history rh, rule r, rh_ro rr where r.rid=rr.ruleid and rh.rule_h_id=rr.rule_h_id and r.rst='t' and rh.rule_h_id=$1 order by r.rid;";
    const value = [historyid];
    return client.query(sql, value).then(rhdb => {
      console.log(JSON.stringify(rhdb.rows[0]));
      const sql =
        "select ch.* from condition_history ch, rule_condition_history rch where ch.condition_h_id=rch.condition_h_id and rch.rule_h_id=$1 order by ch.condition_h_id;";
      const value = [historyid];
      return client.query(sql, value).then(condb => {
        //res.end(JSON.stringify(resRes.rows));
        const sql =
          "select ah.* from action_history ah, rule_action_history rah where ah.action_h_id=rah.action_h_id and rah.rule_h_id = $1 order by ah.action_h_id;";
        const value = [historyid];
        return client.query(sql, value).then(actiondb => {
          var db = {
            rdb: rhdb.rows[0],
            cdb: condb.rows,
            abd: actiondb.rows
          };
          client.release();
          res.send(JSON.stringify(db));
        });
      });
    });
  });
});

module.exports = router;
