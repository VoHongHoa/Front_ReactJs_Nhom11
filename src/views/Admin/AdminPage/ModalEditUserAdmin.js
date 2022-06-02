import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
class ModalEditUserAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      address: "",
      phoneNumber: "",
      fullname: "",
      role: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(preProps, preState) {
    if (preProps.userEdit !== this.props.userEdit) {
      console.log(this.props.userEdit);
      this.setState({
        id: this.props.userEdit._id,
        email: this.props.userEdit.email,
        address: this.props.userEdit.address,
        phoneNumber: this.props.userEdit.phonenumber,
        fullname: this.props.userEdit.fullname,
        role: {
          value: this.props.userEdit.role,
          label: this.props.userEdit.role,
        },
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeSelect = (role) => {
    this.setState({
      role: role,
    });
  };
  handleSaveEdituser = () => {
    let data = {
      id: this.state.id,
      email: this.state.email,
      address: this.state.address,
      phonenumber: this.state.phoneNumber,
      fullname: this.state.fullname,
      role: this.state.role.value,
    };
    this.props.doEditUser(data);
  };
  render() {
    const options = [
      { value: "admin", label: "admin" },
      { value: "customer", label: "customer" },
    ];
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Chỉnh sửa người dùng
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-user-container row">
            <div className="form-group col-6 mt-2">
              <label>Email </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Họ và tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your fullname"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "fullname");
                }}
                value={this.state.fullname}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your address"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
            <div className="form-group col-6 mt-2">
              <label>Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Phone Number"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "phoneNumber");
                }}
                value={this.state.phoneNumber}
              />
            </div>
            <div className="form-group col-6 mt-2">
              <label>Vai trò</label>
              <Select
                onChange={this.handleOnchangeSelect}
                options={options}
                defaultValue={this.state.role}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveEdituser()}
          >
            Lưu thay đổi
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUserAdmin);
