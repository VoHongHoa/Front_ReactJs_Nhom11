import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import { addToCart } from "../../store/actions/AppAction";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import "./Products.scss";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  render() {
    return (
      <React.Fragment>
        <Homeheader />
        <p>Hello product page</p>
        <HomeFooter />
      </React.Fragment>
    );
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Products)
);
