import React, { Component } from "react";
import Show from "../../components/UI/Show/Show";
import { Bar } from "react-chartjs-2";
import axios from "axios";

class Status extends Component {
  state = {
    number: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    chartData: {
      labels: [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May.",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sept.",
        "Oct.",
        "Nov.",
        "Dec."
      ],
      datasets: [
        {
          label: "number",
          data: [2, 10, 54, 43, 123, 56, 90, 19, 21, 65, 11, 32],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)"
          ]
        }
      ]
    }
  };

  componentDidMount() {
    axios.get("/ruleStatus").then(res => {
      const rules = res.data.rd;
      let number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      rules.map(rule => {
        const year = rule.trigger_date.slice(0, 4);
        const month = Number(rule.trigger_date.slice(5, 7));
        if (year === "2018") {
          if (month === 1) number[0] += 1;
          if (month === 2) number[1] += 1;
          if (month === 3) number[2] += 1;
          if (month === 4) number[3] += 1;
          if (month === 5) number[4] += 1;
          if (month === 6) number[5] += 1;
          if (month === 7) number[6] += 1;
          if (month === 8) number[7] += 1;
          if (month === 9) number[8] += 1;
          if (month === 10) number[9] += 1;
          if (month === 11) number[10] += 1;
          if (month === 12) number[11] += 1;
        }
        return true;
      });
      const chartData = {
        labels: [
          "Jan.",
          "Feb.",
          "Mar.",
          "Apr.",
          "May.",
          "Jun.",
          "Jul.",
          "Aug.",
          "Sept.",
          "Oct.",
          "Nov.",
          "Dec."
        ],
        datasets: [
          {
            label: "number",
            data: [2, 10, 54, 43, 123, 56, 90, 19, 21, 65, 11, 32],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)"
            ]
          }
        ]
      };
      chartData.datasets[0].data = number;
      this.setState({ chartData: chartData });
    });
  }

  render() {
    return (
      <Show>
        <div className="chart mt-3">
          <Bar
            data={this.state.chartData}
            width={800}
            height={300}
            options={{
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Rules Triggered Per Month"
              }
            }}
          />
        </div>
      </Show>
    );
  }
}

export default Status;
