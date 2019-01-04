var express = require('express');
var pool = require('./dbConnection');
var bodyParser = require('body-parser');

var router = express.Router();

router.get('/displayCustomer', function(req, res){
    pool.connect().then((client)=>{
        const sql = "select * from customer order by customerid;";

        return client.query(sql).then(cusdb=>{
            var customerdb = {
                customerNum : cusdb.rows.length,
                customers : cusdb.rows
            }
            res.send(JSON.stringify(customerdb));
        });
    });
});

module.exports = router;