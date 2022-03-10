import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { toast } from "react-toastify";
// import Select from "react-select";
import { deleteItem, deleteCart } from "../../../../store/actions/AppAction";
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
      if (copyState.allItems[index].id === item.id) {
        copyState.allItems[index].quantity = quantity;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
  };
  handleDeleteItem = (item) => {
    this.props.deleteItem(item);
    this.setState({
      allItems: this.props.itemInCart,
    });
  };
  handleSubmit = (total) => {
    toast.success(`Thanh toán thành công số tiền là: ${total}`);
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
        className={"modal-user-container"}
        size="lg"
        //centered
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
                <th>Mô tả</th>
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
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.des}</td>
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
    itemInCart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (item) => dispatch(deleteItem(item)),
    deleteCart: () => dispatch(deleteCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);
