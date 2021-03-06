import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { getProductById } from "../../services/ProductService";
import { connect } from "react-redux";

import moment from "moment";
import "./DetailProduct.scss";
import { toast } from "react-toastify";
import {
  addReviews,
  deleteReview,
  editReview,
  getAllReviewProduct,
} from "../../services/ReviewService";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";
import ModalEditReview from "./ModalEditReview";

import detail1 from "../../assets/images/detail1.jpg";
import detail2 from "../../assets/images/detail2.jpg";
import detail3 from "../../assets/images/detail3.jpg";
import detail4 from "../../assets/images/detail4.jpg";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { addToCart } from "../../store/actions/AppAction";

class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      newReview: "",
      allReview: [],
      isShowComment: true,
      curentReview: {},
      isOpenModal: false,
      showHide: false,
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.id;
    let res = await getProductById(id);
    this.getAllReviews(id);
    //console.log("check res: ", res);
    if (res) {
      this.setState({
        product: res && res.product ? res.product : {},
      });
    }
  }
  handleAddToCart = product => {
    console.log(product);
    this.props.addToCart(product);
  };

  handleShowHideButton = () => {
    this.setState({
      showHide: !this.state.showHide,
    });
  };

  getAllReviews = async productId => {
    try {
      let res = await getAllReviewProduct(productId);
      this.setState({
        allReview: res,
      });
    } catch (e) {
      console.log(e);
    }
  };
  handleOnchangeInput = event => {
    this.setState({
      newReview: event.target.value,
    });
  };
  checkAddNewComment = () => {
    let isValid = true;
    if (this.props.isLogin === false) {
      toast.error("Vui l??ng ????ng nh???p");
      isValid = false;
      return;
    }
    if (this.state.newReview === "") {
      toast.error("Vui l??ng th??m n???i dung b??nh lu???n!");
      isValid = false;
      return;
    }
    return isValid;
  };
  handleAddNewReview = async () => {
    try {
      if (this.checkAddNewComment()) {
        let data = {
          review: this.state.newReview,
          productId: this.state.product._id,
        };
        let res = await addReviews(data);
        //console.log(res);
        if (res && res.success === true) {
          this.setState({
            newReview: "",
          });
          toast.success("Th??m b??nh lu???n th??nh c??ng!");
          this.getAllReviews(this.props.match.params.id);
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Th??m b??nh lu???n kh??ng th??nh c??ng");
    }
  };
  handleShowComment = () => {
    this.setState({
      isShowComment: !this.state.isShowComment,
    });
  };
  handleDeleteReview = async reviewId => {
    try {
      let res = await deleteReview(reviewId);
      //console.log(res);
      if (res && res.success === true) {
        toast.success("X??a b??nh lu???n th??nh c??ng!");
        this.getAllReviews(this.props.match.params.id);
      }
    } catch (e) {
      console.log(e);
      toast.error("L???i server");
    }
  };
  handleOpenModalEditReview = async item => {
    this.setState({
      curentReview: item,
      isOpenModal: true,
    });
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  handleReturnHome = () => {
    this.props.history.push("/");
  };
  doEditReview = async data => {
    try {
      let res = await editReview(data);
      //console.log(res);
      if (res && res.success === true) {
        toast.success("Ch???nh s???a th??nh c??ng");
        this.getAllReviews(this.props.match.params.id);
        this.setState({
          isOpenModal: false,
        });
      } else {
        toast.error("Ch???nh s???a th???t b???i");
      }
    } catch (e) {
      console.log(e);
      toast.error("L???i server");
    }
  };
  render() {
    let { product, allReview, isShowComment } = this.state;
    let isEmptyObj = Object.keys(product).length === 0;
    let showHide = this.state.showHide;
    // console.log(allReview);
    return (
      <React.Fragment>
        <div className="container">
          <section className="homepage-header-container">
            <Homeheader />
          </section>
          <section id="sidebar">
            <p>
              <span
                onClick={() => this.handleReturnHome()}
                style={{ cursor: "pointer" }}
              >
                Trang ch???
              </span>{" "}
              | <b>{product.title}</b>
            </p>
          </section>
          <div className="container-detail">
            <div className="card-product">
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <div className="row">
                  <div className="col-lg-5 col-md-5 col-sm-6">
                    <div className="white-box text-center">
                      <img src={product.img} className="img-responsive" />
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-6">
                    <h2 className="mt-5">{product.price} VN??</h2>
                    <button
                      className="btn btn-dark btn-rounded mr-1"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Add to cart"
                      onClick={() => this.handleAddToCart(product)}
                    >
                      <i className="fa fa-shopping-cart"></i>
                    </button>
                    {/* <button className="btn btn-primary btn-rounded">
                      Buy Now
                    </button> */}
                    <h3 className="box-title mt-5">Khuy???n m??i</h3>
                    <ul className="list-unstyled">
                      <li>
                        <i className="fa fa-check text-success"></i>S???n ph???m
                        ??ang thu???c ch????ng tr??nh Flash sale (S??? l?????ng c?? h???n)
                      </li>
                      <li>
                        <i className="fa fa-check text-success"></i>Gi???m ?????n 30%
                        G??i b???o h??nh Samsung Care+ ch??? c??n 2.780.000??
                      </li>
                      <li>
                        <i className="fa fa-check text-success"></i>T???ng sim
                        data Mobifone Hera 5G (2.5GB/ng??y)
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <h3 className="box-title mt-5">Th??ng tin k??? thu???t</h3>
                    <div className="table-responsive">
                      <table className="table table-striped table-product">
                        <tbody>
                          <tr>
                            <td>Product name</td>
                            <td>{product.title}</td>
                          </tr>
                          <tr>
                            <td width="390">Brand</td>
                            <td>{product.categories}</td>
                          </tr>
                          <tr>
                            <td>Ram</td>
                            <td>{product.ram}</td>
                          </tr>
                          <tr>
                            <td>Rom</td>
                            <td>{product.rom}</td>
                          </tr>
                          <tr>
                            <td>Color</td>
                            <td>{product.color}</td>
                          </tr>
                          <tr>
                            <td>Outstanding features</td>
                            <td>{product.desc}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="moreInformation">
            <div className="information-product">
              <h5 className="title-information">
                Si??u ph???m ???????c mong ch??? nh???t ??? n???a cu???i n??m 2021 ?????n t??? Apple.
              </h5>
              <h6>Thi????t k???? ?????ng c???p h??ng ?????u</h6>
              <p>
                iPhone m???i k??? th???a thi???t k??? ?????c tr??ng t??? iPhone 12 Pro Max khi
                s??? h???u khung vi???n vu??ng v???c, m???t l??ng k??nh c??ng m??n h??nh tai th???
                tr??n vi???n n???m ??? ph??a tr?????c.
              </p>
              <div className="more-detail-img">
                <img className="detail1" src={detail1} alt="detail-img" />
              </div>
              <p>
                V???i iPhone 13 Pro Max ph???n tai th??? ???? ???????c thu g???n l???i 20% so
                v???i th??? h??? tr?????c, kh??ng ch??? gi???i ph??ng nhi???u kh??ng gian hi???n th???
                h??n m?? c??n gi??p m???t tr?????c chi???c ??i???n tho???i tr??? n??n h???p d???n h??n
                m?? v???n ?????m b???o ???????c ho???t ?????ng c???a c??c c???m bi???n.
              </p>
            </div>
            {showHide === false && (
              <div>
                <div>
                  <p className="dot">........</p>
                </div>
                <button
                  className="show-button"
                  onClick={() => this.handleShowHideButton()}
                >
                  <AiOutlineCaretDown /> Hi???n th??? th??m
                </button>
              </div>
            )}
            {showHide && (
              <div>
                <div className="information-product">
                  <div className="more-detail-img">
                    <img className="detail1" src={detail2} alt="detail-img" />
                  </div>
                  <p>
                    ??i????m thay ??????i d??? d??ng nh???n bi???t tr??n iPhone 13 Pro Max ch??nh
                    la?? k??ch th?????c c???a c???m bi???n camera sau ???????c l??m to h??n v?? ?????
                    t??ng ????? nh???n di???n cho s???n ph???m m???i th?? Apple c??ng ???? b??? sung
                    m???t t??y ch???n m??u s???c Sierra Blue (m??u xanh d????ng nh???t h??n so
                    v???i Pacific Blue c???a iPhone 12 Pro Max).
                  </p>
                  <div className="more-detail-img">
                    <img className="detail1" src={detail3} alt="detail-img" />
                  </div>
                  <p>
                    M??y v???n ti???p t???c s??? d???ng khung vi???n th??p cao c???p cho kh???
                    n??ng ch???ng tr???y x?????c v?? va ?????p m???t c??ch v?????t tr???i, k???t h???p
                    v???i kha?? n??ng kh??ng bu??i, n??????c chu????n IP68.
                  </p>
                  <h6>M??n h??nh gi???i tr?? si??u m?????t c??ng t???n s??? qu??t 120 Hz</h6>
                  <p>
                    iPhone 13 Pro Max ???????c trang b??? m??n h??nh k??ch th?????c 6.7 inch
                    c??ng ????? ph??n gi???i 1284 x 2778 Pixels, s??? d???ng t???m n???n OLED
                    c??ng c??ng ngh??? Super Retina XDR cho kh??? n??ng ti???t ki???m n??ng
                    l?????ng v?????t tr???i nh??ng v???n ?????m b???o hi???n th??? s???c n??t s???ng ?????ng
                    ch??n th???c.
                  </p>
                  <div className="more-detail-img">
                    <img className="detail1" src={detail4} alt="detail-img" />
                  </div>
                </div>
                <button
                  className="hide-button"
                  onClick={() => this.handleShowHideButton()}
                >
                  <AiFillCaretUp /> ???n b???t
                </button>
              </div>
            )}
          </div>
          <div className="comment">
            <h2>B??nh lu???n</h2>
            <div className="form-groud">
              <label>Th??m b??nh lu???n</label>

              <textarea
                className="form-control"
                onChange={event => this.handleOnchangeInput(event)}
                value={this.state.newReview}
              ></textarea>
            </div>
            <button
              className="btn btn-primary mb-2 mt-2"
              onClick={() => this.handleAddNewReview()}
            >
              Th??m b??nh lu???n
            </button>
          </div>

          <div className="container mt-5">
            <div className="row  d-flex justify-content-center">
              <div className="col-md-8">
                <div className="headings d-flex justify-content-between align-items-center mb-3">
                  <h5> {allReview.length} B??nh lu???n</h5>

                  <div className="buttons">
                    <span className="badge bg-white d-flex flex-row align-items-center">
                      <span className="text-primary">
                        Hi???n b??nh lu???n {isShowComment === true ? "ON" : "OFF"}
                      </span>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked={this.state.isShowComment}
                          onChange={() => this.handleShowComment()}
                        />
                      </div>
                    </span>
                  </div>
                </div>
                {isShowComment === true && (
                  <div className="comments-view mb-3">
                    {allReview &&
                      allReview.length > 0 &&
                      allReview.map((item, index) => {
                        return (
                          <div className="card p-3 mt-2" key={item._id}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="user d-flex flex-row align-items-center">
                                <img
                                  src={
                                    item.user[0] && item.user[0].img
                                      ? item.user[0].img
                                      : defaultAvatar
                                  }
                                  width="30"
                                  className="user-img rounded-circle mr-2"
                                />
                                <span>
                                  <small className="font-weight-bold text-primary">
                                    {item.user[0] && item.user[0].fullname
                                      ? item.user[0].fullname
                                      : "Ng?????i d??ng"}
                                  </small>{" "}
                                  <small className="font-weight-bold">
                                    {item.review}
                                  </small>
                                </span>
                              </div>

                              <small>
                                {moment(item.updatedAt).format("Do MMMM YYYY")}
                              </small>
                            </div>

                            {this.props.userInfor.user &&
                              this.props.userInfor.user._id === item.userId && (
                                <div className="action d-flex justify-content-between mt-2 align-items-center">
                                  <div className="reply px-4">
                                    <small
                                      onClick={() =>
                                        this.handleDeleteReview(item._id)
                                      }
                                    >
                                      X??a
                                    </small>
                                    <span className="dots"></span>
                                    <small
                                      onClick={() =>
                                        this.handleOpenModalEditReview(item)
                                      }
                                    >
                                      S???a
                                    </small>
                                  </div>
                                  <div className="icons align-items-center">
                                    <i className="fa fa-check-circle-o check-icon text-primary"></i>
                                  </div>
                                </div>
                              )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <ModalEditReview
            isOpen={this.state.isOpenModal}
            toggleFromParent={this.toggleFromParent}
            review={this.state.curentReview}
            doEditReview={this.doEditReview}
          />
          <HomeFooter />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfor: state.user.userInfor,
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = dispatch => {
  return { addToCart: item => dispatch(addToCart(item)) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
);
