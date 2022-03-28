import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  deleteItem,
  deleteCart,
  changeInputItem,
} from "../../../../store/actions/AppAction";
import "./ModalCart.scss";
class ModalCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
    };
  }
  componentDidMount() {
    this.setState({
      allItems: this.props.itemInCart,
    });
  }
  //prevProps
  componentDidUpdate() {
    if (this.state.allItems !== this.props.itemInCart) {
      this.setState({
        allItems: this.props.itemInCart,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnchangeInput = (event, item) => {
    let copyState = { ...this.state };
    let quantity = event.target.value;
    for (let index = 0; index < copyState.allItems.length; index++) {
      if (copyState.allItems[index]._id === item._id) {
        copyState.allItems[index].quantity = quantity;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
    this.props.changeInputItem(this.state.allItems);
  };
  handleDeleteItem = (item) => {
    this.props.deleteItem(item);
    this.setState({
      allItems: this.props.itemInCart,
    });
  };
  handleSubmit = (total) => {
    let data = {
      userId: this.props.userInfor._id,
      products: []
    };
    this.props.deleteCart();
    this.toggle();
  };
  render() {
    let { allItems } = this.state;
    let total = 0;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-cart-container"}
        size="lg"
        scrollable
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Giỏ hàng của bạn
        </ModalHeader>
        <ModalBody>
          <table>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Hình ảnh</th>
                <th>Số lượng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allItems &&
                allItems.length > 0 &&
                allItems.map((item, index) => {
                  total = total + item.price * item.quantity;
                  return (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>
                        <div
                          className="img-product"
                          style={{
                            backgroundImage: `url(${item.base64Img})`,
                            height: "80px",
                            width: "50px",
                            backgroundPosition: "center",
                            backgroundRepeat: "none",
                            backgroundSize: "cover",
                          }}
                        ></div>
                      </td>
                      <td>
                        <input
                          value={item.quantity}
                          onChange={(event) =>
                            this.handleOnchangeInput(event, item)
                          }
                        />
                      </td>
                      <td onClick={() => this.handleDeleteItem(item)}>
                        <i className="fas fa-trash"></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <span>Total: {total}</span>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSubmit(total)}
          >
            Thanh toán
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemInCart: state.cart.cart,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (item) => dispatch(deleteItem(item)),
    deleteCart: () => dispatch(deleteCart()),
    changeInputItem: (allItems) => dispatch(changeInputItem(allItems)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);
