import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../Adminheader/AdminHeader";
import "./Dashboard.scss";
import ChartUser from "../Chart/ChartUser";
import ChartOrder from "../Chart/ChartOrder";
import Homeheader from "../../Homepage/Homeheader/Homeheader";
import HomeFooter from "../../Homepage/HomeFooter/HomeFooter";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  render() {
    return (
      <div className="container chartContainer">
        <section className="homepage-header-container">
          <Homeheader />
        </section>
        <div className="row mt-2 mb-2">
          <div className="left-content col-md-2 mt-2">
            <AdminHeader></AdminHeader>
          </div>

          <div className="right-content col-md-10">
            <div className="chart-content mt-2 row">
              <div className="col-6 chart-detail">
                <ChartUser />
                <span className="mt-2 chart-title">
                  Biểu đồ biểu thị số tài khoản đăng kí theo từng tháng
                </span>
              </div>
              <div className="col-6 chart-detail">
                <ChartOrder />
                <span className="mt-2 chart-title">
                  Biểu đồ biểu thị doanh thu theo từng tháng
                </span>
              </div>
            </div>
          </div>
        </div>
        <HomeFooter />
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
