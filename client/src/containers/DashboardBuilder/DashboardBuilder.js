import React, { Component } from "react";
import Show from "../../components/UI/Show/Show";
import Cards from "../../components/DashboardItems/Cards/Cards";
import Tables from "../../components/DashboardItems/Tables/Tables";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import axios from "axios";

class DashboardBuilder extends Component {
  state = {
    rules: [],
    actions: []
  };

  componentDidMount() {
    axios.get("/onlyRules").then(res => {
      this.setState({ rules: res.data });
      // this.setState({actions: actions})
    });
  }

  render() {
    return (
      <Aux>
        <Show>
          <Cards ruleno={this.state.rules.length} />
        </Show>
        <Tables rules={this.state.rules} actions={this.state.actions} />
      </Aux>
    );
  }
}

export default DashboardBuilder;
