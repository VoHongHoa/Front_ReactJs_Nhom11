import React, { Component } from "react";
import { connect } from "react-redux";
import "./Homeheader.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import ModalCart from "./ModalCart/ModalCart";
class Homeheader extends Component {
  //   returnToHome = () => {
  //     this.props.history.push(path.HOMEPAGE);
  //   };
  constructor(props) {
    super(props);
    this.state = {
      isOpenCart: false,
    };
  }
  handleIsOpenCart = () => {
    this.setState({
      isOpenCart: true,
    });
  };
  handleCloseCart = () => {
    this.setState({
      isOpenCart: false,
    });
  };
  handleOpenLogin = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <React.Fragment>
        <div className="header-container container-fluid">
          <div className="top-header row">
            <div className="col-3 logo-container">
              <i class="fab fa-phoenix-squadron fa-3x"></i>
              <span>UITPHONE</span>
            </div>

            <div className="col-6 search-container">
              <input className="form-control" placeholder="Search..." />
              <button type="submit" className="btn-submit">
                <i class="fa fa-search fa-2x"></i>
              </button>
            </div>
            <div className="col-3 log-in">
              <div className="btn-log-in">
                {/* <i className="fas fa-sign-in fa-2x"></i> */}
                <button
                  className="btn btn-light"
                  onClick={() => this.handleOpenLogin()}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
          <div className="bottom-header ">
            <div className="navbar">
              <NavLink to="/" activeClassName="active" exact={true}>
                Home
              </NavLink>
              <NavLink to="/product" activeClassName="active" exact={true}>
                Sam Sum
              </NavLink>
              {/* <NavLink to="/product" activeClassName="active" exact={true}>
                Sam Sum
              </NavLink>
              <NavLink to="/product" activeClassName="active" exact={true}>
                Sam Sum
              </NavLink>
              <NavLink to="/product" activeClassName="active" exact={true}>
                Sam Sum
              </NavLink> */}
              <button
                type="button"
                className="btn-cart"
                onClick={() => this.handleIsOpenCart()}
              >
                <i className="fas fa-cart-plus fa-2x"></i>
              </button>
            </div>
          </div>
        </div>

        <ModalCart
          isOpen={this.state.isOpenCart}
          toggleFromParent={this.handleCloseCart}
        />
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
