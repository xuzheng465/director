import React from "react";

import { NavLink } from "react-router-dom";
import classes from "./NavItem.css";
const navItem = props => {
  return (
    <li className="nav-item">
      <NavLink
        activeClassName={classes.Current}
        to={props.link}
        exact
        className={"nav-link text-white p-3 mb-2 " + classes["Sidebar-link"]}
      >
        <i className={props.icon+"  text-light mr-3"} />
        {props.title}
      </NavLink>
    </li>
  );
};

export default navItem;
