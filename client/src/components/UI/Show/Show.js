import React from "react";

const show = props => {
  return (
    <div className={"container-fluid"}>
      <div className="row">
        <div className="col-md-8 col-lg-9 col-xl-10 ml-auto">
          <div className="row pt-md-5 mt-md-3 mb-5 display-5 ml-2 mr-2">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default show;
