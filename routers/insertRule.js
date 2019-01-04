var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.post("/insertRule", (req, res) => {
  const ruleName = req.body.ruleName;
  const ruleDes = req.body.ruleDes;
  const ruleTag = req.body.ruleTag;
  const conditionDB = req.body.conditionDB;
  const actionDB = req.body.actionDB;
  var ridReference = "";
  var cidReference = [];
  var aidReference = [];

  pool.connect().then(client => {
    const text =
      "INSERT INTO rule(rname, rtag, rdescription, create_date, rst, customerid) VALUES($1, $2, $3, current_date, $4, 1)  RETURNING *";
    const values = [ruleName, ruleTag, ruleDes, "t"];
    return client.query(text, values).then(resRule => {
      ridReference = resRule.rows[0].rid;
      conditionDB.map(item => {
        const text =
          "INSERT INTO conditions(symbol, value, value_type, parameter) VALUES($1,$2,$3, $4)  RETURNING *";
        const values = [item.symbol, item.value, item.value_type, item.param];
        return client.query(text, values).then(resCon => {
          cidReference.push(resCon.rows[0].conditionid);
          if (cidReference.length === conditionDB.length) {
            actionDB.map(item => {
              aidReference.push(item.action_id);

              if (aidReference.length === actionDB.length) {
                cidReference.map(item => {
                  const text =
                    "INSERT INTO rule_condition(rule_id,conditionid) VALUES($1,$2)";
                  const value = [ridReference, item];
                  pool.query(text, value);
                });

                aidReference.map(item => {
                  const text =
                    "INSERT INTO rule_action(ruleid,actionid) VALUES($1,$2)";
                  const value = [ridReference, item];
                  pool.query(text, value);
                });
              }
            });
          }
        });
      });
    });
  });
  res.send("1");
});

module.exports = router;
