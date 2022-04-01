import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Homeheader from "../../Homepage/Homeheader/Homeheader";
import HomeFooter from "../../Homepage/HomeFooter/HomeFooter";
class Oder extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="container-fluid">
        <Homeheader />
        <p>hello wordl</p>
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Oder));
