import React from "react";

import Sidebar from "../Sidebar/Sidebar";
import Topnav from "../TopBarForSearch/TopBarForSearch";
import Toggler from "../Toggler/Toggler";
const navbar = () => (
  <nav className="navbar navbar-expand-md navbar-light">
    <Toggler />
    <div className="collapse navbar-collapse" id="myNavbar">
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <Topnav />
        </div>
      </div>
    </div>
  </nav>
);

export default navbar;
