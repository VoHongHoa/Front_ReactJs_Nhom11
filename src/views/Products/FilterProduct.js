import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addToCart } from "../../store/actions/AppAction";
// import "./Filter.scss";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  render() {
    return <p>Hello</p>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));
