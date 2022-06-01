import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../Adminheader/AdminHeader";
import "./Dashboard.scss";
import ChartUser from "../Chart/ChartUser";
import ChartOrder from "../Chart/ChartOrder";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  render() {
    return (
      <div className="container chartContainer">
        <AdminHeader />
        <div className="chart-content">
          <div className="col-5 chart-detail">
            <ChartUser />
            <span className="mt-2 chart-title">
              Biểu đồ biểu thị số tài khoản đăng kí theo từng tháng
            </span>
          </div>
          <div className="col-5 chart-detail">
            <ChartOrder />
            <span className="mt-2 chart-title">
              Biểu đồ biểu thị doanh thu theo từng tháng
            </span>
          </div>
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
