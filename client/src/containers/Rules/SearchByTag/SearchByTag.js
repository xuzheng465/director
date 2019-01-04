import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Show from "../../../components/UI/Show/Show";
import classes from "../SearchRule/SearchRule.css";
import Pagination from "react-js-pagination";

class SearchByTag extends Component {
  state = {
    tag: null,
    rules: [],
    activePage: 1,
    totalItemsCount: 2,
    pages: 1,
    currentrules: [],
    itemsCountPerPage: 5
  };

  componentDidMount() {
    const tag = this.props.match.params.tag;
    axios.get("/searchByTag/" + tag).then(res => {
      const totalItemsCount = res.data.length;
      const itemsCountPerPage = 5;
      const pages = Math.ceil(totalItemsCount / itemsCountPerPage);
      this.setState({
        rules: res.data,
        tag: tag,
        totalItemCount: totalItemsCount,
        pages: pages,
        currentrules: res.data.slice(0, 5)
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

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    let rules = [];
    if (this.state.rules) {
      rules = this.state.rules.map(rule => {
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
        <p>Search By Tag - {this.state.tag}</p>
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

export default SearchByTag;
