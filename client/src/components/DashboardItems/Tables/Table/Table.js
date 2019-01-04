import React from "react";
import { Link } from "react-router-dom";
import classes from "./Table.css";
const Table = props => {
  let contents = [];
  if (props.content) {
    contents = props.content.reverse().map((content, index) => {
      const date = content.create_date.slice(0, 10);
      return (
        <tr key={content.rid}>
          <th>{index + 1}</th>
          <td>{content.rname}</td>
          <td>{date ? date : "10/10/2018"}</td>
          <td>
            <Link to={"/rule/" + content.rid}>
              <button className={"btn btn-sm " + classes.Button}>More</button>
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="col-lg-12 col-xl-6">
      <h3 className="text-muted text-center mb-3">{props.title}</h3>
      <table className="table table-striped bg-light text-center">
        <thead>
          <tr className="text-muted">
            <th>No.</th>
            <th>Name</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>{contents}</tbody>
      </table>
      <Link to={"/rules"}>
        <button className={classes.Button}>Display All</button>
      </Link>
    </div>
  );
};

export default Table;
