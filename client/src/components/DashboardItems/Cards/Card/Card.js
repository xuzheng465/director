import React from "react";
import { Link } from "react-router-dom";
import classes from "./Card.css";

const Card = props => {
  return (
    <div className="col-sm-6 col-xl-3 p-2">
      <div className={"card card-common " + classes.Card}>
        <Link to={props.url} style={{ textDecoration: "none" }}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <i className={props.icon} />
              <div className="text-right text-secondary">
                <h5>{props.title}</h5>
                <h3>{props.number}</h3>
              </div>
            </div>
          </div>
          <div className="card-footer text-secondary">
            <i className="fas fa-external-link-alt mr-3" />
            <span>Details</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
