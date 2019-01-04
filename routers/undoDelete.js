var express = require("express");
var pool = require("./dbConnection");
var bodyParser = require("body-parser");

var router = express.Router();

router.get("/undoDelete/:id", (req, res) => {
  const rid = req.params.id;

  pool.connect().then(client => {
    const sql = "UPDATE rule SET rst='t' where rid=$1;";
    const value = [rid];
    return client.query(sql, value).then(delRes => {
      const sql = "UPDATE rule_status SET rst='t' where ruleid=$1;";
      const value = [rid];
      return client.query(sql, value).then(delStatus => {
        client.release();
        res.send("1");
      });
    });
  });
});

module.exports = router;
