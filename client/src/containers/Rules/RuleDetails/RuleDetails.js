import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import classes from "./RuleDetails.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Show from "../../../components/UI/Show/Show";

class RuleDetails extends Component {
  state = {
    id: null,
    name: null
  };
  componentDidMount() {
    const rid = this.props.match.params.id;

    this.setState({ id: rid });
    axios.get(`/ruleDetails/${rid}`).then(res => {
      const response = res.data;
      this.setState({
        name: response.rdb.rname,
        description: response.rdb.rdescription,
        tag: response.rdb.rtag,
        date: String(response.rdb.create_date.slice(0, 10)),
        conditions: response.cdb,
        actions: response.adb
      });
    });
  }

  deleteHandler = () => {
    axios
      .post("/deleteRule/" + this.state.id)
      .then(res => {
        console.log(res);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let conditionContent = <p>There are no conditions</p>;
    if (this.state.conditions) {
      conditionContent = this.state.conditions.map((condition, index) => {
        return (
          <Aux key={condition.conditionid}>
            <li>Name: {condition.parameter}</li>
            <li>Symbol: {condition.symbol}</li>
            <li>Value: {condition.value}</li>
          </Aux>
        );
      });
    }
    let actionContent = <p> There are no actions </p>;
    if (this.state.actions) {
      actionContent = this.state.actions.map((action, index) => {
        return (
          <Aux key={action.action_id}>
            <li>Action Name: {action.aname}</li>
          </Aux>
        );
      });
    }
    return (
      <Show>
        <Link to="/rules">
          <button className={"btn btn-link"}>
            <i
              className="fas fa-arrow-left"
              style={{ fontSize: "30px", color: "grey", marginLeft: "100px" }}
              name="returnToDisplay"
            />
          </button>
        </Link>
        <div style={{ marginLeft: "50px", width: "800px" }}>
          <div>
            <h2 className={classes.Title} name="ruleTitle">
              {this.state.name}
            </h2>
            <Link to={"/searchtag/" + this.state.tag}>
              <label className={"btn btn-primary " + classes.Taglabel}>
                {this.state.tag}
              </label>
            </Link>
          </div>
          <div style={{ width: "1000px" }}>
            <table className={"table table-striped " + classes.Tables}>
              <tbody>
                <tr>
                  <th className={classes.Th}>Description:</th>
                  <td>{this.state.description}</td>
                </tr>
                <tr>
                  <th>Date:</th>
                  <td>{this.state.date}</td>
                </tr>
                <tr>
                  <th>Conditions:</th>
                  <td>{conditionContent}</td>
                </tr>
                <tr>
                  <th>Actions:</th>
                  <td>{actionContent}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link to={"/edit/" + this.state.id}>
            <button
              type="button"
              name="editbtn"
              className={"btn mr-3 btn-sm " + classes.Button}
            >
              Edit
            </button>
          </Link>

          <button
            type="button"
            name="dltbtn"
            className={"btn btn-sm " + classes.RemoveButton}
            onClick={this.deleteHandler}
          >
            Delete
          </button>
        </div>
      </Show>
    );
  }
}

export default RuleDetails;
