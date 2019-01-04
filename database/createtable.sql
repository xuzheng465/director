create table customer(
	customerid serial primary key not null,
	customername varchar(50) not null
);

create table rule(
 	rid serial not null,
 	rname varchar(50) not null,
  	rtag varchar(50) not null,
  	rdescription varchar(100) not null,
	create_date date not null,
	rst varchar(10) not null,
	customerid int references customer(customerid) not null,
 	primary key (rid)
 );

 create table action(
 	action_id serial primary key not null,
 	aname varchar(50) not null
 );

 create table rule_action(
 	ruleid int references rule(rid) not null,
 	actionid int references action(action_id) not null,
 	primary key (ruleid, actionid)
 );

 create table conditions(
 	conditionID serial not null,
 	parameter varchar(50) not null,
 	symbol varchar(50) not null,
 	value varchar(50) not null,
  	value_type varchar(50) not null,
 	primary key (conditionID)
 );

 create table rule_history(
 	rule_H_ID serial not null,
 	change_date date not null,
	rhname varchar(50) not null,
	rhtag varchar(50) not null,
	rdescription varchar(50) not null,
 	primary key (rule_H_ID)
 );

 create table rh_ro(
 	rule_h_id int references rule_history(rule_h_id) not null,
	-- ruleID int references rule(rid),
 	ruleID int references rule(rid) not null,
 	primary key (rule_H_ID, ruleID)
 );

 create table condition_history (
 	condition_h_id serial not null,
 	parameter varchar(50) not null,
  	symbol varchar(50) not null,
 	value varchar(50) not null,
  	value_type varchar(50) not null,
  	primary key (condition_h_id)
 );

 create table rule_condition_history (
 	rule_h_id int references rule_history(rule_h_id) not null,
 	condition_h_id int references condition_history(condition_h_id) not null,
 	primary key (rule_h_id, condition_h_id)
 );


create table action_history (
	action_h_id serial not null,
	ahname varchar(50) not null,
	primary key (action_h_id)
);

create table rule_action_history (
	rule_h_id int references rule_history(rule_h_id) not null,
	action_h_id int references action_history(action_h_id) not null,
	primary key (rule_h_id, action_h_id)
);

 create table rule_condition (
 	rule_id int references rule(rid) not null,
 	conditionid int references conditions(conditionid) not null,
 	primary key (rule_id, conditionid)
 );

 create table raw_data (
 	id serial not null,
 	name varchar(50) not null,
 	value varchar (50) not null,
  	value_type varchar(50) not null,
 	primary key (id)
 );

 create table rd_condition (
 	conditionID int references conditions(conditionid) not null,
 	parameterID int references raw_data(id) not null,
 	primary key (conditionID, parameterID)
 );

create table rule_status(
 	statusid serial not null,
 	trigger_date date not null,
	--ruleID int references rule(rid),
	rst varchar(10) not null,
	ruleID int references rule(rid) not null,
 	primary key (statusid)
 );