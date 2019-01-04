var express = require ('express');
var bodyParser = require('body-parser');
const { Pool } = require('pg');

var onlyRules = require('./routers/onlyRules');
var ruleDetails = require('./routers/ruleDetails');
var deleteRules = require('./routers/deleteRules');
var searchByName = require('./routers/searchByName');
var searchByTag = require('./routers/searchByTag');
var insertRule = require('./routers/insertRule');
var ruleHistory = require('./routers/ruleHistory');
var historyDetails = require('./routers/historyDetails');
var deletedRules = require('./routers/deletedRules');
var testEngine = require('./routers/testEngine');
var undoDelete = require('./routers/undoDelete');
var updateRule = require('./routers/updateRule');
var ruleStatus = require('./routers/ruleStatus');
var displayCustomer = require('./routers/displayCustomer');
var customerDetails = require('./routers/customerDetails');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', onlyRules);
app.use('/', ruleDetails);
app.use('/', deleteRules);
app.use('/', searchByName);
app.use('/', searchByTag);
app.use('/', insertRule);
app.use('/', ruleHistory);
app.use('/', historyDetails);
app.use('/', deletedRules);
app.use('/', testEngine);
app.use('/', undoDelete);
app.use('/', updateRule);
app.use('/', ruleStatus);
app.use('/', displayCustomer);
app.use('/', customerDetails);

app.listen(3005);
console.log('listening to port 3005');