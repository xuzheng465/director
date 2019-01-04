import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className={"container-fluid"}>
        <div className="App">
          {/* Navbar */}

          <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light p-2">
            <div className="container">
              <div href="https://freestyletechnology.com.au/" className="logo">
                <a href="https://freestyletechnology.com.au/">
                  <img
                    src="http://freestyletechnology.com.au/web/image/FS-home-logo.png"
                    height="35"
                    width="105"
                    alt="fslogo"
                  />
                </a>
              </div>

              <a href="index.html" className="navbar-brand">
                DIRECTOR
              </a>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="/dashboard" className="nav-link" id="signed">
                      Signed in as
                    </a>
                  </li>
                  <li className="nav-item active">
                    <a href="profile.html" className="nav-link">
                      {" "}
                      Sean Brown{" "}
                    </a>
                  </li>
                  <li className="nav-img">
                    <a href="profile.html">
                      <img
                        src="../img/person5.jpg"
                        alt="myimage"
                        className="circular-image"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Carousel */}

          <section id="showcase">
            <div
              id="myCarousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#myCarousel"
                  data-slide-to="0"
                  className="active"
                />
                <li data-target="#myCarousel" data-slide-to="1" />
                <li data-target="#myCarousel" data-slide-to="2" />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item carousel-image-1 active">
                  <div className="container">
                    <div className="carousel-caption d-none d-sm-block text-right mb-5">
                      <h1 className="display-3">Welcome to Director</h1>
                      <p className="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iste, aperiam vel ullam deleniti reiciendis ratione quod
                        aliquid inventore vero perspiciatis.
                      </p>
                      <NavLink
                        className="btn btn-success btn-lg"
                        to="/dashboard"
                      >
                        Go to Dashboard
                      </NavLink>
                    </div>
                  </div>
                </div>

                <div className="carousel-item carousel-image-2">
                  <div className="container">
                    <div className="carousel-caption d-none d-sm-block mb-5">
                      <h1 className="display-3">
                        Control, Monitor and Maintain
                      </h1>
                      <p className="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iste, aperiam vel ullam deleniti reiciendis ratione quod
                        aliquid inventore vero perspiciatis.
                      </p>
                      <a href="/dashboard" className="btn btn-primary btn-lg">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>

                <div className="carousel-item carousel-image-3">
                  <div className="container">
                    <div className="carousel-caption d-none d-sm-block text-right mb-5">
                      <h1 className="display-3">About Freestyle</h1>
                      <p className="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iste, aperiam vel ullam deleniti reiciendis ratione quod
                        aliquid inventore vero perspiciatis.
                      </p>
                      <a
                        href="https://freestyletechnology.com.au/contact.html"
                        className="btn btn-success btn-lg"
                        id="Freestyle"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#myCarousel"
                data-slide="prev"
                className="carousel-control-prev"
              >
                <span className="carousel-control-prev-icon" />
              </a>

              <a
                href="#myCarousel"
                data-slide="next"
                className="carousel-control-next"
              >
                <span className="carousel-control-next-icon" />
              </a>
            </div>
          </section>

          {/* Home Icon */}

          <section id="home-icons" className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-4 mb-4 text-center">
                  <i className="fas fa-cog fa-3x mb-2" />
                  <h3>Control</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Libero, veniam.
                  </p>
                </div>
                <div className="col-md-4 mb-4 text-center">
                  <i className="fas fa-chalkboard-teacher fa-3x mb-2" />
                  <h3>Monitor</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Libero, veniam.
                  </p>
                </div>
                <div className="col-md-4 mb-4 text-center">
                  <i className="fas fa-chart-bar fa-3x mb-2" />
                  <h3>Maintain</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Libero, veniam.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Home Head */}

          <section id="home-heading" className="p-5">
            <div className="dark-overlay">
              <div className="row">
                <div className="col">
                  <div className="container pt-5">
                    <h1>Know about our VISION</h1>
                    <p className="d-none d-md-block">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Est eaque magni sit dolores. Nisi, dolor nam modi
                      perspiciatis consequatur soluta.
                    </p>
                    <a href="/dashboard" className="btn btn-primary btn-lg">
                      Go to VISION
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}

          <footer id="main-footer" className="text-center p-4">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p>
                    Copyright &copy;
                    <span id="year" /> Freestyle Technology | Director
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* <NavLink to="/dashboard">
              <Button name="wdashborad">DashBoard</Button>
            </NavLink> */}
      </div>
    );
  }
}

export default Welcome;
