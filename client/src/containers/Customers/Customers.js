import React, { Component } from "react";
import Show from "../../components/UI/Show/Show";
import "./Customers.css";

class Customers extends Component {
  render() {
    return (
      <Show>
        <div>
          {/* Header */}

          <header id="main-header" className="py-2 bg-light text-black">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>Customers </h1>
                </div>
              </div>
            </div>
          </header>

          {/* Table */}

          <section id="posts" />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <table className="table table-lg">
                    <thead id="thead">
                      <tr id="thead-element">
                        <th>
                          Customer ID{" "}
                          <i className="fa fa-sort" aria-hidden="true" />{" "}
                        </th>
                        <th>
                          Name <i className="fa fa-sort" aria-hidden="true" />{" "}
                        </th>
                        <th>
                          Category{" "}
                          <i className="fa fa-sort" aria-hidden="true" />{" "}
                        </th>
                        <th>
                          Rule ID{" "}
                          <i className="fa fa-sort" aria-hidden="true" />{" "}
                        </th>
                        <th>
                          Issue <i className="fa fa-sort" aria-hidden="true" />{" "}
                        </th>
                        <th>
                          Date <i className="fa fa-sort" aria-hidden="true" />{" "}
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>001001</td>
                        <td>Customer 1</td>
                        <td>Gas</td>
                        <td>Rule 233566</td>
                        <td>Leaked</td>
                        <td>May 10 2018</td>
                      </tr>
                      <tr>
                        <td>0200023</td>
                        <td>Customer 2</td>
                        <td>Water</td>
                        <td>Rule 21323</td>
                        <td>Overflow</td>
                        <td>April 11 2018</td>
                      </tr>
                      <tr>
                        <td>000323</td>
                        <td>Customer 3</td>
                        <td>Electricity</td>
                        <td>Rule 00012</td>
                        <td>Disconnected</td>
                        <td>January 13 2018</td>
                      </tr>
                      <tr>
                        <td>055034</td>
                        <td>Customer 4</td>
                        <td>Electricity</td>
                        <td>Rule 2212</td>
                        <td>No usage</td>
                        <td>November 15 2012</td>
                      </tr>
                      <tr>
                        <td>052230</td>
                        <td>Customer 5</td>
                        <td>Gas</td>
                        <td>Rule 2293</td>
                        <td>Low Pressure</td>
                        <td>June 17 2018</td>
                      </tr>
                      <tr>
                        <td>411356</td>
                        <td>Customer 6</td>
                        <td>Water</td>
                        <td>Rule 00212</td>
                        <td>Leaked</td>
                        <td>August 20 2018</td>
                      </tr>

                      <tr>
                        <td>668306</td>
                        <td>Customer 7</td>
                        <td>Gas</td>
                        <td>Rule 078882</td>
                        <td>Leaked</td>
                        <td>March 5 2018</td>
                      </tr>
                      <tr>
                        <td>003536</td>
                        <td>Customer 8</td>
                        <td>Water</td>
                        <td>Rule 056712</td>
                        <td>Overflow</td>
                        <td>June 10 2018</td>
                      </tr>
                      <tr>
                        <td>985306</td>
                        <td>Customer 9</td>
                        <td>Water</td>
                        <td>Rule 0062</td>
                        <td>Leaked</td>
                        <td>February 3 2018</td>
                      </tr>
                      <tr>
                        <td>445786</td>
                        <td>Customer 10</td>
                        <td>Electricity</td>
                        <td>Rule 2562</td>
                        <td>Disconnected</td>
                        <td>August 24 2018</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pagination">
                <nav aria-label="...">
                  <ul className="pagination pagination-sm">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabindex="-1">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Show>
    );
  }
}

export default Customers;
