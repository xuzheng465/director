import React, { Component } from "react";
import classes from "./Sidebar.css";
import logoFS from "../../../../img/FS-logo-green.png";
import { NavLink } from "react-router-dom";
import NavItem from "../NavItem/NavItem";

class Sidebar extends Component {
  render() {
    return (
      <div
        className={"col-md-4 col-lg-3 col-xl-2 fixed-top " + classes.Sidebar}
      >
        <NavLink
          to="/dashboard"
          className={
            "navbar-brand mx-auto text-white d-block py-3 mb-5 " +
            classes["Bottom-border"]
          }
        >
          <img
            src={logoFS}
            alt="logoFS"
            className={classes["LOGO-freestyle"]}
            name="logo"
          />
        </NavLink>
        <ul className="navbar-nav flex-column" id="sidebar">
          {/*<NavItem*/}
          {/*title={"Welcome"}*/}
          {/*link={"/welcome"}*/}
          {/*icon={"fas fa-home fa-lg"}*/}
          {/*/>*/}
          <NavItem
            title={"Dashboard"}
            link={"/"}
            icon={"fas fa-cogs fa-lg"}
            name="dashboard"
          />
          <NavItem
            title={"Display Rules"}
            link={"/rules"}
            icon={"fas fa-book fa-lg"}
            name="displayrules"
          />
          <NavItem
            title={"Add Rule"}
            link={"/add"}
            icon={"fas fa-edit fa-lg"}
            name="addrule"
          />
          <NavItem
            title={"Rule Status"}
            link={"/status"}
            icon={"fas fa-chart-bar fa-lg"}
            name="status"
          />
        </ul>
      </div>
    );
  }
}

export default Sidebar;
