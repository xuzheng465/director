import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import classes from "./AllRules.css";
import axios from "axios";

import Show from "../../../components/UI/Show/Show";

class allRules extends Component {
  state = {
    rules: [],
    history: []
  };

  componentDidMount() {
    axios.get("/onlyRules").then(res => {
      this.setState({ rules: res.data });
    });
    axios.get("/ruleHistory").then(res => {
      this.setState({ history: res.data });
    });
  }

  render() {
    let rules = [];
    let history = [];
    let columns = [
      {
        title: " ",
        dataIndex: "qian1"
      },
      {
        title: "No.",
        dataIndex: "ID"
      },
      {
        title: " ",
        dataIndex: "empty1"
      },
      {
        title: " ",
        dataIndex: "empty2"
      },
      {
        title: " ",
        dataIndex: "empty3"
      },
      {
        title: " ",
        dataIndex: "empty4"
      },
      {
        title: "Name",
        dataIndex: "name"
      },
      {
        title: " ",
        dataIndex: "empty5"
      },
      {
        title: " ",
        dataIndex: "empty6"
      },
      {
        title: " ",
        dataIndex: "empty7"
      },
      {
        title: " ",
        dataIndex: "empty8"
      },
      {
        title: "Date",
        dataIndex: "date"
      },
      {
        title: " ",
        dataIndex: "empty9"
      },
      {
        title: " ",
        dataIndex: "empty10"
      },
      {
        title: " ",
        dataIndex: "empty11"
      },
      {
        title: " ",
        dataIndex: "empty12"
      },
      {
        title: "Details",
        dataIndex: "details",
        render: details => (
          <Link to={"/rule/" + details}>
            <button
              type="button"
              className={"btn btn-sm " + classes.Button}
              name="rulesDetails"
            >
              More
            </button>
          </Link>
        )
      },
      {
        title: " ",
        dataIndex: "hou1"
      },
      {
        title: " ",
        dataIndex: "hou2"
      }
    ];
    if (this.state.rules) {
      rules = this.state.rules.map(rule => {
        const date = rule.create_date.slice(0, 10);
        return {
          ID: rule.rid,
          name: rule.rname,
          date: date ? date : "10/10/2018",
          details: rule.rid
        };
      });
    }
    if (this.state.history) {
      history = this.state.history.map(histories => {
        const hdate = histories.change_date.slice(0, 10);
        return {
          ID: histories.rule_h_id,
          name: histories.rhname,
          date: hdate ? hdate : "10/10/2018",
          details: histories.rdescription
        };
      });
    }

    let hcolumns = [
      {
        title: " ",
        dataIndex: "qian1"
      },
      {
        title: "No.",
        dataIndex: "ID"
      },
      {
        title: " ",
        dataIndex: "empty1"
      },
      {
        title: " ",
        dataIndex: "empty2"
      },
      {
        title: " ",
        dataIndex: "empty3"
      },
      {
        title: " ",
        dataIndex: "empty4"
      },
      {
        title: "Name",
        dataIndex: "name"
      },
      {
        title: " ",
        dataIndex: "empty5"
      },
      {
        title: " ",
        dataIndex: "empty6"
      },
      {
        title: " ",
        dataIndex: "empty7"
      },
      {
        title: " ",
        dataIndex: "empty8"
      },
      {
        title: "Date",
        dataIndex: "date"
      },
      {
        title: " ",
        dataIndex: "empty9"
      },
      {
        title: " ",
        dataIndex: "empty10"
      },
      {
        title: " ",
        dataIndex: "empty11"
      },
      {
        title: " ",
        dataIndex: "empty12"
      },
      {
        title: "Details",
        dataIndex: "details",
        render: details => (
          <Link to={"/rule/" + details}>
            <button
              type="button"
              className={"btn btn-sm " + classes.Button}
              name="rulesDetails"
            >
              More
            </button>
          </Link>
        )
      },
      {
        title: " ",
        dataIndex: "hou1"
      },
      {
        title: " ",
        dataIndex: "hou2"
      }
    ];

    let pagination = {
      className: "pagination text-center center " + classes.Paginationstyle,
      pageSize: 4
    };
    return (
      <Show>
        <Link to="/dashboard">
          <button className={"btn btn-link " + classes.Btnstyle}>
            <i
              className="fas fa-arrow-left"
              style={{ fontSize: "30px", color: "grey" }}
            />
          </button>
        </Link>
        <h5 className={classes.rtitle}>Rules</h5>
        <Table
          className={"table table-striped text-center " + classes.Tablestyle}
          columns={columns}
          dataSource={rules}
          pagination={pagination}
          bordered="true"
        />
        <h5 className={classes.htitle}>History Rules</h5>
        <Table
          className={"table table-striped text-center " + classes.Tablestylee}
          columns={hcolumns}
          dataSource={history}
          pagination={pagination}
          bordered="true"
        />
      </Show>
    );
  }
}

export default allRules;
