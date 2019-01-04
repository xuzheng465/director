import React, { Component } from "react";
import AdminPic from "../../../../img/admin.jpeg";
import { Link, withRouter } from "react-router-dom";

class Topnav extends Component {
  state = {
    name: ""
  };

  searchByNameHandler = event => {
    event.preventDefault();
    const name = this.state.name;
    this.props.history.push("/search/" + name);
  };

  inputChangedHandler = event => {
    const name = event.target.value;
    this.setState({ name: name });
  };

  render() {
    return (
      <div className="col-lg-9 col-xl-10 col-md-8 ml-auto fixed-top py-2 my-2 top-navbar mr-2">
        <div className="row align-items-center">
          <div className="col-xl-6 col-md-2 col-sm-1 col-lg-5 dash-title">
            {}
          </div>
          <div className="col-xl-3 col-md-3 col-lg-3">
            <form onSubmit={this.searchByNameHandler} name="searchForm">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search Rules By Name..."
                  name="searchRule"
                  onChange={this.inputChangedHandler}
                />
                <button type="submit" className="btn btn-white search-button">
                  <i className="fas fa-search text-success " />
                </button>
                {/*<button type="submit" className="btn btn-white search-button">*/}
                {/*<i className="fas fa-search text-dark " />*/}
                {/*</button>*/}
              </div>
            </form>
          </div>

          <div className="col-xl-3 col-md-6 col-lg-4">
            <ul className="navbar-nav ">
              <li className="nav-item icon-parent">
                <div href="" className="nav-link icon-bullet">
                  <i className="far fa-bell fa-lg " />
                </div>
              </li>
              <li className="nav-item my-1 ml-md-auto">
                <img
                  src={AdminPic}
                  width="50"
                  alt="admin"
                  className="rounded-circle mr-3"
                />
                <Link to="/" className="text-dark mr-3">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Topnav);
