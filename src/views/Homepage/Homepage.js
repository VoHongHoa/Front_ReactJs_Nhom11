import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Homeheader from "./Homeheader/Homeheader";
class HomePage extends Component {
  //   returnToHome = () => {
  //     this.props.history.push(path.HOMEPAGE);
  //   };
  render() {
    return (
      <React.Fragment>
        <Homeheader />
      </React.Fragment>
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
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
