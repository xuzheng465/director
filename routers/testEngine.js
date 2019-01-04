var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.get("/testEngine", function(req, res) {
  pool.connect().then(client => {
    const sql = "select * from rule where rst = 't' order by rid;";
    return client.query(sql).then(rdb => {
      var rstatus = new Array();
      var flag = 0;
      rdb.rows.map(item => {
        var rid = item.rid;
        const sql =
          "select c.* from conditions c, rule_condition rc where c.conditionid=rc.conditionid and rc.rule_id=$1 order by c.conditionid;";
        const value = [rid];
        return client.query(sql, value).then(condb => {
          const sql =
            "select a.* from action a, rule_action ra where a.action_id=ra.actionid and ra.ruleid=$1;";
          const value = [rid];
          return client.query(sql, value).then(actiondb => {
            var rawdb = new Array();
            condb.rows.map(item => {
              const sql = "select * from raw_data where name=$1;";
              const value = [item.parameter];

              return client.query(sql, value).then(rawData => {
                rawdb.push(rawData.rows[0]);
                if (rawdb.length == condb.rows.length) {
                  var db = {
                    condb: condb.rows,
                    actiondb: actiondb.rows,
                    rawdb: rawdb
                  };
                  //console.log("rid: " + rid);
                  //console.log(JSON.stringify(rawdb))
                  if (enginetest(db)) {
                    rstatus.push(rid);
                    const sql =
                      "insert into rule_status ( trigger_date, rst, ruleid) values (current_date, 't', $1);";
                    const value = [rid];
                    client.query(sql, value);
                  }
                  flag++;
                  //console.log("flag: " + flag)
                  //console.log("rdb length: "+rdb.rows.length)
                  if (flag == rdb.rows.length)
                    res.send(JSON.stringify(rstatus));
                }
              });
            });
          });
        });
      });
    });
  });

  function enginetest(db) {
    var raw_data = db.rawdb;
    var resultList = new Array();
    var condb = db.condb;
    var adb = db.actiondb;
    //console.log(JSON.stringify(condb));
    //console.log(JSON.stringify(raw_data));
    //console.log("raw_data"+JSON.stringify(raw_data))
    //console.log("0: " + raw_data[0].value);
    //console.log("1: " + raw_data[1].value);
    var i = 0;
    condb.map(item => {
      var symbol = item.symbol;
      var rhparam = item.value;
      var lhparam = raw_data[i].value;
      console.log(lhparam + " " + symbol + " " + rhparam);
      var temp = testSymbol(symbol, lhparam, rhparam);
      console.log("resulet: " + temp);
      resultList.push(temp);
      i++;
    });
    //console.log(resultList);
    var flag = false;
    for (var i = 0; i < resultList.length; i++) {
      if (resultList[i] != true) {
        flag = false;
        break;
      } else {
        flag = true;
      }
    }

    //console.log(flag);
    var engineResult = "Triggered actions: ";
    if (flag) {
      adb.map(item => {
        engineResult += item.name + " ";
      });
    } else {
      engineResult = "The rule does not be triggered!";
    }

    return flag;
  }
  function testSymbol(symbol, lhparam, rhparam) {
    if (symbol === "larger") {
      var result = larger(lhparam, rhparam);
      return result;
    }
    if (symbol === "smaller") {
      var result = smaller(lhparam, rhparam);
      return result;
    }
    if (symbol === "equal") {
      var result = equal(lhparam, rhparam);
      return result;
    } else return false;
  }
  function larger(lhparam, rhparam) {
    if (lhparam > rhparam) return true;
    else return false;
  }
  function smaller(lhparam, rhparam) {
    if (lhparam < rhparam) return true;
    else return false;
  }
  function equal(lhparam, rhparam) {
    if (lhparam == rhparam) return true;
    else return false;
  }

  //console.log(enginetest(db));
  //console.log(db.test);
  function enginetest1(db) {
    var raw_data = db.raw_data;
    var resultList = new Array();
    var condb = db.condb;
    var adb = db.actiondb;
    console.log(JSON.stringify(condb));
    console.log(JSON.stringify(raw_data));
    condb.map(item => {
      var i = 0;
      var symbol = item.symbol;
      var rhparam = item.param;
      var lhparam = raw_data;
      var temp = testSymbol(symbol, lhparam, rhparam);
      resultList.push(temp);
      i++;
    });
    console.log(resultList);
    var flag = false;
    for (var i = 0; i < resultList.length; i++) {
      if (resultList[i] != true) {
        flag = false;
        break;
      } else {
        flag = true;
      }
    }

    console.log(flag);
    var engineResult = "Triggered actions: ";
    if (flag) {
      adb.map(item => {
        engineResult += item.name + " ";
      });
    } else {
      engineResult = "The rule does not be triggered!";
    }

    return engineResult;
  }

  // var testList = new Array();
  // testList.push(db1);
  // testList.push(db2);
  // testList.push(db3);
  // testList.push(db4);
  // testList.push(db5);
  // testList.push(db6);
  // testList.push(db7);

  // for (var i=0; i<testList.length; i++)
  // {
  //     console.log("test " + i + " : ")
  //     console.log(enginetest(testList[i]));
  //     console.log("The result should be : "+testList[i].resultt);
  // }
  // res.end("test finished");
});

module.exports = router;
