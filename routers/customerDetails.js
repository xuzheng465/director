var express = require('express');
var pool = require('./dbConnection');
var bodyParser = require('body-parser');

var router = express.Router();

router.get('/customerDetails/:customerid', function(req, res){
    const customerid = req.params.customerid;
    pool.connect().then((client)=>{
        const sql = "select * from rule where customerid = $1;";
        const value = [customerid];
        return client.query(sql,value).then(rdb=>{
            var result = new Array();
            var flag = 0;
            rdb.rows.map(item => {
                const sql = "select * from rule_status where ruleid = $1;";
                const value = [item.rid];
                return client.query(sql, value).then(rsdb=>{
                    var status = "";
                    if(rsdb.rows.length==0) status = "not triggered";
                    else status = "triggered";
                    var db = {
                        ruledb : item,
                        ruleStatus : status
                    }
                    result.push(db);
                    flag++;
                    if(flag == rdb.rows.length) res.send(JSON.stringify(result));
                });
            });
        });
    });
});

module.exports = router;