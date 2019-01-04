import React from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Card from "./Card/Card";
const Cards = props => {
  return (
    <Aux>
      <Card
        title={"Rules"}
        number={props.ruleno ? props.ruleno : 2000}
        icon={"fas fa-book fa-3x text-warning"}
        url={"/rules"}
      />

      <Card
        title={"Triggered"}
        number={props.number ? props.number : 10000}
        icon={"fas fa-wrench fa-3x text-success"}
        url={"/"}
      />

      <Card
        title={"Customers"}
        number={props.number ? props.number : 3000}
        icon={"fas fa-podcast fa-3x text-info"}
        url={"/customers"}
      />
      <Card
        title={"Status"}
        number={"---"}
        icon={"fas fa-chart-pie fa-3x text-primary"}
        url={"/status"}
      />
    </Aux>
  );
};

export default Cards;
