import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./Homepage/Homepage";
import Product from "./Products/Product";
import DetailProduct from "./DetailProduct/DetailProduct";
import Login from "./User/Login/Login";
import EditUser from "./User/EditUser/EditUser";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserManage from "./Admin/AdminPage/UserManage";
import ProductManage from "./Admin/AdminPage/ProductManage";
import ForgotPassword from "./User/ForgotPassword/ForgotPassword";
import Oder from "./User/Oder/Oder";
import ManageOrder from "./Admin/AdminPage/ManageOrder";
import Dashboard from "./Admin/AdminPage/Dashboard";
import Search from "./Homepage/Search/Search";
import ModalCart from "./Homepage/Homeheader/ModalCart/ModalCart";
import UserOrder from "./Homepage/Homeheader/UserOrder";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ResetPasswordStatus from "../components/ResetPasswordStatus";
import Blog from "./Blog/Blog";
import Blog1 from "./Blog/Blog1";
import Blog2 from "./Blog/Blog2";
import Blog3 from "./Blog/Blog3";
import Blog4 from "./Blog/Blog4";
import Contact from "./Contact/Contact";
import About from "./About/About";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    let { isLogin, userInfor } = this.props;
    console.log(isLogin, userInfor);

    return (
      <BrowserRouter>
        <PayPalScriptProvider
          options={{ "client-id": process.env.REACT_APP_CLIENT_ID_PAYPAL }}
        >
          <div className="App container">
            <Switch>
              <Route path="/" exact>
                <Homepage />
              </Route>
              <Route exact path="/blog">
                <Blog />
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <Route exact path="/about-us">
                <About />
              </Route>
              <Route exact path="/blog/blog1">
                <Blog1 />
              </Route>
              <Route path="/blog/blog2" exact>
                <Blog2 />
              </Route>
              <Route path="/blog/blog3" exact>
                <Blog3 />
              </Route>
              <Route path="/blog/blog4" exact>
                <Blog4 />
              </Route>
              <Route path="/search" exact>
                <Search />
              </Route>
              <Route path="/cart" exact>
                <ModalCart />
              </Route>

              <Route path="/products/:category" exact>
                <Product />
              </Route>
              <Route path="/detail-product/:id">
                <DetailProduct />
              </Route>
              <Route exact path="/login">
                {isLogin ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route exact path="/user/:id">
                {isLogin === false ? <Redirect to="/login" /> : <EditUser />}
              </Route>
              <Route path="/forgotpassword" exact>
                <ForgotPassword />
              </Route>
              <Route exact path="/admin">
                {isLogin === true &&
                userInfor &&
                userInfor.user &&
                userInfor.user.role === "admin" ? (
                  <Dashboard />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route exact path="/admin/user">
                {isLogin === true &&
                userInfor &&
                userInfor.user &&
                userInfor.user.role === "admin" ? (
                  <UserManage />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>

              <Route path="/admin/product" exact>
                {isLogin === true &&
                userInfor &&
                userInfor.user &&
                userInfor.user.role === "admin" ? (
                  <ProductManage />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>

              <Route path="/admin/order" exact>
                {isLogin === true &&
                userInfor &&
                userInfor.user &&
                userInfor.user.role === "admin" ? (
                  <ManageOrder />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>

              <Route path="/order" exact>
                {isLogin === false ? <Redirect to="/login" /> : <Oder />}
              </Route>
              <Route path="/user-orders" exact>
                {isLogin === true ? <UserOrder /> : <Redirect to="/login" />}
              </Route>

              <Route path="/do-reset-password/:email/:newPassword" exact>
                <ResetPasswordStatus />
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
              theme="light"
            />
          </div>
        </PayPalScriptProvider>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
