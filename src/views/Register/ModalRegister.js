import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { handleRegisterUser } from "../../services/UserService";
import { toast } from "react-toastify";
import Select from "react-select";

class ModalRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      address: "",
      phoneNumber: "",
      selectedOption: "",
    };
  }
  componentDidMount() {}

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
  handleOnchangeSelect = (selectedOption) => {
    this.setState({
      selectedOption: selectedOption,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "name",
      "address",
      "phoneNumber",
      "selectedOption",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      // console.log(this.state[arrInput[i]]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error(`Vui lòng điền thông tin ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };
  handleRegisterUser = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api create modal
      let response = await handleRegisterUser(this.state);
      console.log("check respone", response);
      if (response && response.errorCode === 1) {
        toast.success(response.message);
        this.setState({
          email: "",
          password: "",
          name: "",
          address: "",
          phoneNumber: "",
          selectedOption: "",
        });
      } else {
        toast.error(response.message);
      }
    }
    //
  };
  render() {
    const options = [
      { value: "F", label: "Nam" },
      { value: "M", label: "Nữ" },
      { value: "O", label: "Khác" },
    ];
    let { selectedOption } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Đăng kí người dùng
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
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "password");
                }}
                value={this.state.password}
              />
            </div>

            <div className="form-group mt-2">
              <label>Họ và tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Fullname"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "name");
                }}
                value={this.state.name}
              />
            </div>

            <div className="form-group mt-2">
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
              <label>Giới tính</label>
              <Select
                value={selectedOption}
                onChange={this.handleOnchangeSelect}
                options={options}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleRegisterUser()}
          >
            Đăng kí
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalRegister);
