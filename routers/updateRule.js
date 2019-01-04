var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.post("/updateRule", (req, res) => {
  var rdata = req.body.ruledata;
  var cdata = req.body.conditiondata;
  var adata = req.body.actiondata;

  pool.connect().then(client => {
    // get the data before update
    //console.log(JSON.stringify(rdata));
    //console.log(JSON.stringify(cdata));
    //console.log(JSON.stringify(adata));
    const sql = "SELECT * FROM rule WHERE rid = $1;";
    const value = [rdata.rid];
    return client.query(sql, value).then(ruleInfo => {
      const sql =
        "SELECT c.* FROM conditions c, rule_condition rc WHERE c.conditionid = rc.conditionid AND rc.rule_id = $1;";
      const value = [rdata.rid];
      return client.query(sql, value).then(condb => {
        const sql =
          "SELECT a.* FROM action a, rule_action ra WHERE a.action_id = ra.actionid AND ra.ruleid = $1;";
        const value = [rdata.rid];
        return client.query(sql, value).then(actiondb => {
          var db = {
            rdb: ruleInfo.rows,
            cdb: condb.rows,
            adb: actiondb.rows
          };
          //console.log(JSON.stringify(db));
          // start insert the data into the history table.
          //const sql = "INSERT INTO rule_history(change_date, rhname, rhtag, rdescription, rhid, implementation) VALUES(current_date, $1, $2, $3, $4, 'update') RETURNING *";
          //const values = [db.rdb[0].rname, db.rdb[0].rtag, db.rdb[0].rdescription, db.rdb[0].rid];
          const sql =
            "INSERT INTO rule_history(change_date, rhname, rhtag, rdescription) VALUES(current_date, $1, $2, $3) RETURNING *";
          const values = [
            db.rdb[0].rname,
            db.rdb[0].rtag,
            db.rdb[0].rdescription
          ];
          return client.query(sql, values).then(historydb => {
            var cflag = 0;
            //console.log("historydb : "+JSON.stringify(historydb.rows));
            //console.log("cdb : "+JSON.stringify(db.cdb));
            db.cdb.map(item => {
              const sql =
                "INSERT INTO condition_history(parameter, symbol, value, value_type) VALUES($1,$2,$3,$4) RETURNING *;";
              const values = [
                item.parameter,
                item.symbol,
                item.value,
                item.value_type
              ];
              return client.query(sql, values).then(resHC => {
                //console.log("resHC : "+JSON.stringify(resHC.rows));
                cflag += 1;
                const sql =
                  "INSERT INTO rule_condition_history(rule_h_id, condition_h_id) VALUES ($1, $2);";
                const values = [
                  historydb.rows[0].rule_h_id,
                  resHC.rows[0].condition_h_id
                ];
                client.query(sql, values);
                if (cflag == db.cdb.length) {
                  var aflag = 0;
                  db.adb.map(item => {
                    const sql =
                      "INSERT INTO action_history(ahname) VALUES($1) RETURNING *;";
                    const values = [item.aname];
                    return client.query(sql, values).then(resHA => {
                      //console.log("resHA : " + JSON.stringify(resHA.rows));
                      aflag += 1;
                      const sql =
                        "INSERT INTO rule_action_history(rule_h_id, action_h_id) VALUES($1, $2);";
                      const values = [
                        historydb.rows[0].rule_h_id,
                        resHA.rows[0].action_h_id
                      ];
                      client.query(sql, values);
                      if (aflag == db.adb.length) {
                        const sql =
                          "INSERT INTO rh_ro (rule_h_id, ruleid) VALUES ($1, $2);";
                        const values = [historydb.rows[0].rule_h_id, rdata.rid];
                        client.query(sql, values).then(resLast => {
                          // start update the rule
                          const sql =
                            "UPDATE rule SET rname = $1, rdescription = $2, rtag = $3 WHERE rid = $4";
                          const value = [
                            rdata.rname,
                            rdata.rdescription,
                            rdata.rtag,
                            rdata.rid
                          ];
                          return client.query(sql, value).then(resR => {
                            var cflag = 0;
                            cdata.map(item => {
                              const sql =
                                "UPDATE conditions SET symbol = $1, value = $2, value_type = $3, parameter = $4 WHERE conditionid = $5";
                              const value = [
                                item.symbol,
                                item.value,
                                item.value_type,
                                item.parameter,
                                item.cid
                              ];
                              return client.query(sql, value).then(resC => {
                                cflag += 1;
                                if (cflag == cdata.length) {
                                  // ahidList is used to save action_history_id
                                  var ahidList = new Array();
                                  actiondb.rows.map(item => {
                                    ahidList.push(item.action_id);
                                  });

                                  var ahflag = 0;
                                  adata.map(item => {
                                    // const sql = "UPDATE action SET aname = $1 WHERE action_id = $2";
                                    // const value = [item.aname,item.aid];

                                    const sql =
                                      "UPDATE rule_action SET actionid = $1 WHERE actionid=$2 AND ruleid=$3;";
                                    const value = [
                                      item.aid,
                                      ahidList[ahflag],
                                      rdata.rid
                                    ];
                                    ahflag++;
                                    return client
                                      .query(sql, value)
                                      .then(resA => {
                                        client.release();
                                        res.send("complete");
                                      });
                                  });
                                }
                              });
                            });
                          });
                        });
                      }
                    });
                  });
                }
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;
