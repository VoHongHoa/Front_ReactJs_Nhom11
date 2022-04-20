import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { countOrderByMonth } from "../../../services/OderService";
ChartJS.register(...registerables);

class ChartOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      allMonth: [],
      numOfUserByMonth: [],
    };
  }
  async componentDidMount() {
    let res = await countOrderByMonth();
    if (res) {
      this.setState({
        chartData: res,
      });
      this.buiDataChart(this.state.chartData);
    }
  }
  buiDataChart = (chartData) => {
    let allMonth = [];
    let numOfUserByMonth = [];
    if (chartData && chartData.length > 0) {
      for (let index = 0; index < chartData.length; index++) {
        for (let j = 1; j <= 12; j++) {
          if (chartData[index]._id === j) {
            let labelMonth = `Tháng ${j}`;
            allMonth.push(labelMonth);
            break;
          }
        }
        numOfUserByMonth.push(chartData[index].total);
      }
    }
    this.setState({
      allMonth: allMonth,
      numOfUserByMonth: numOfUserByMonth,
    });
  };
  render() {
    let state = {
      labels: this.state.allMonth,
      datasets: [
        {
          label: "Doanh thu bán hàng theo từng tháng",
          backgroundColor: "rgb(240,175,0)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: this.state.numOfUserByMonth,
        },
      ],
    };
    return (
      <div>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChartOrder)
);
