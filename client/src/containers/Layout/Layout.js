import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";

import MyNavbar from "./Navbar/Navbar";
class Layout extends Component {
  state = {
    modal: false,
    collapse: false
  };

  render() {
    return (
      <Aux>
        <MyNavbar />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
