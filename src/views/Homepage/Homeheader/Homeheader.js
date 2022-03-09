import React, { Component } from "react";
import { connect } from "react-redux";
import "./Homeheader.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
class Homeheader extends Component {
  //   returnToHome = () => {
  //     this.props.history.push(path.HOMEPAGE);
  //   };
  render() {
    return (
      <React.Fragment>
        <div className="topnav">
          <NavLink to="/" activeClassName="active" exact={true}>
            Home
          </NavLink>
          <NavLink to="/product" activeClassName="active" exact={true}>
            Product
          </NavLink>
          <NavLink to="/login" activeClassName="active" exact={true}>
            Login
          </NavLink>
          <NavLink to="/register" activeClassName="active" exact={true}>
            Register
          </NavLink>
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(Homeheader)
);
