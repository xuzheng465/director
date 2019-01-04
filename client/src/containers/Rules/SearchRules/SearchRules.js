import React, { Component } from "react";
import Pagination from "react-js-pagination";
import Show from "../../../components/UI/Show/Show";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./SearchRules.css";

class SearchRule extends Component {
  state = {
    rules: [],
    activePage: 1,
    totalItemsCount: 2,
    pages: 1,
    currentrules: [],
    itemsCountPerPage: 5,
    search: ""
  };

  componentDidMount() {
    const name = this.props.match.params.name;

    axios.get("/searchByName/" + name).then(res => {
      const totalItemsCount = res.data.length;
      const itemsCountPerPage = 5;
      const pages = Math.ceil(totalItemsCount / itemsCountPerPage);
      this.setState({
        rules: res.data,
        totalItemCount: totalItemsCount,
        pages: pages,
        currentrules: res.data.slice(0, 5),
        search: name
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activePage !== prevState.activePage) {
      let rules = [];
      if (this.state.activePage === 1) {
        rules = prevState.rules.slice(
          5 * (this.state.activePage - 1),
          this.state.itemsCountPerPage
        );
      } else {
        rules = prevState.rules.slice(
          5 * (this.state.activePage - 1),
          5 * (this.state.activePage - 1) + this.state.itemsCountPerPage
        );
      }

      this.setState({ currentrules: rules });
    }
  }

  debug = () => {
    console.log(this.state.search);
  };

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };
  render() {
    let rules = [];
    if (this.state.rules) {
      rules = this.state.currentrules.map(rule => {
        return (
          <tr key={rule.rid}>
            <th>{rule.rid}</th>
            <td name="resultName">{rule.rname}</td>
            <td>
              {rule.create_date ? rule.create_date.slice(0, 10) : "10/10/2018"}
            </td>
            <td>
              <Link to={"/rule/" + rule.rid}>
                <button
                  type="button"
                  className={"btn btn-sm " + classes.Button}
                >
                  More
                </button>
              </Link>
            </td>
          </tr>
        );
      });
    }
    return (
      <Show>
        <table className="table table-striped bg-light text-center">
          <thead>
            <tr className="text-muted">
              <th>Rule ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{rules}</tbody>
        </table>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={this.state.rules.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          style={{ padding: "5px" }}
          innerClass={"pagination mt-4 "}
          itemClass={"page-item "}
          linkClass={"page-link "}
        />
      </Show>
    );
  }
}

export default SearchRule;
