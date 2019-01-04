import React from "react";
import Table from "./Table/Table";

const Tables = props => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
          <div className={"row"}>
            <div className="col-xl-3" />
            <Table title={"Recent Rules"} content={props.rules.slice(-5)} />

            {/*<Table title={"Triggered Rules"} content={props.actions} />*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
