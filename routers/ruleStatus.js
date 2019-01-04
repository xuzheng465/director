var express = require('express');
var pool = require('./dbConnection');
var bodyParser = require('body-parser');

var router = express.Router();

router.get('/ruleStatus', function(req, res){
    var sqlstr = "select rs.*, r.* from rule_status rs, rule r where rs.ruleid=r.rid order by rs.statusid;";
    pool.connect().then((client)=>{
        return client.query(sqlstr).then(ruleda => {
            var ruledata = ruleda.rows;
            var sql2 = "select count(*)  as rulenumber from rule where rst = 't';"
            return client.query(sql2).then(rulest => {
                var rulecount = rulest;
                var sql3 = "select count(distinct ruleid) as triggerrules from rule_status where rst = 't' ;"
                return client.query(sql3).then(resfinal => {
                    var result = {
                        rd : ruledata,
                        rn : rulest.rows[0].rulenumber,
                        rs : resfinal.rows[0].triggerrules
                    }
                    res.send(JSON.stringify(result));
                });
            });           
        });
    });
    
});

module.exports = router;