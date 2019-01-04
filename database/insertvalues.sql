------insert data into customer table -------
insert into customer (customername) values ('water company');
insert into customer (customername) values ('gas company');
insert into customer (customername) values ('electric company');


---- insert data into rele table ---
insert into rule (
	rname,
	rtag,
	rdescription,
	create_date,
	rst,
	customerid
) values (
	'waterleak',
	'water',
	'alert water leak',
	current_date,
	't',
	1
);
insert into rule (
	rname,
	rtag,
	rdescription,
	create_date,
	rst,
	customerid
) values (
	'electric leak',
	'eletric',
	'alert electric leak',
	current_date,
	't',
	3
);
insert into rule (
	rname,
	rtag,
	rdescription,
	create_date,
	rst,
	customerid
) values (
	'gasleak',
	'gas',
	'alert gas leak',
	current_date,
	't',
	2
);

 --- insert data into action table ---

insert into action (
	aname
) values (
	'text'
);
insert into action (
	aname
) values (
	'email'
);
insert into action (
	aname
) values (
	'alert'
);

 --- insert data into rele-action table ---

 insert into rule_action (
	ruleid,
	actionid
) values (
	1,
	1
);
insert into rule_action (
	ruleid,
	actionid
) values (
	2,
	2
);
insert into rule_action (
	ruleid,
	actionid
) values (
	3,
	3
);

--- insert data into condition table ---

insert into conditions (
	parameter,
	symbol,
	value,
	value_type
) values (
	'water_presure',
	'larger',
	'50',
	'int'
);
insert into conditions (
	parameter,
	symbol,
	value,
	value_type
) values (
	'gas_presure',
	'equl',
	'30',
	'int'
);
insert into conditions (
	parameter,
	symbol,
	value,
	value_type
) values (
	'electric_usage',
	'smaller',
	'50',
	'int'
);

--- insert data into rule_condition ---

insert into rule_condition (
	rule_id,
 	conditionid
) values (
	1,
	1
);
insert into rule_condition (
	rule_id,
 	conditionid
) values (
	2,
	3
);
insert into rule_condition (
	rule_id,
 	conditionid
) values (
	3,
	2
);


insert into rule_status (
	trigger_date,
	ruleid,
	rst
) values (
	current_date,
	1,
	't'
);

insert into rule_status (
	trigger_date,
	ruleid,
	rst
) values (
	'2018-07-23',
	3,
	't'
);


