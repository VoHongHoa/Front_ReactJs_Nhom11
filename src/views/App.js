import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./Homepage/Homepage";
import Product from "./Products/Product";
import Login from "./User/Login/Login";
import EditUser from "./User/EditUser/EditUser";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
class App extends Component {
  render() {
    let { isLogin } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/product" exact>
              <Product />
            </Route>
            {/* <Route path="/login" exact>
              <Login />
            </Route> */}
            <Route exact path="/login">
              {isLogin ? <Redirect to="/" /> : <Login />}
            </Route>
            {/* <Route path="/user:id" exact>
              <EditUser />
            </Route> */}

            <Route exact path="/user:id">
              {isLogin === false ? <Redirect to="/login" /> : <EditUser />}
            </Route>
          </Switch>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
