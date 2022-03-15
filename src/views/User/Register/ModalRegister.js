import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { handleRegisterUser } from "../../../services/UserService";
import { toast } from "react-toastify";
//import Select from "react-select";

class ModalRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      address: "",
      phoneNumber: "",
      fullname: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(preProps, preState) {}

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
  // handleOnchangeSelect = (selectedOption) => {
  //   this.setState({
  //     selectedOption: selectedOption,
  //   });
  // };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "fullname",
      "username",
      "address",
      "phoneNumber",
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
    //console.log(this.state);

    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api create modal
      let response = await handleRegisterUser({
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        fullname: this.state.fullname,
        address: this.state.address,
        telephone: this.state.phoneNumber,
        //gender: this.state.selectedOption.label,
      });
      //console.log("check respone", response);
      if (response && response.success === true) {
        toast.success(response.message);
        this.setState({
          email: "",
          password: "",
          username: "",
          address: "",
          phoneNumber: "",
          //selectedOption: "",
        });
        this.toggle();
      } else {
        toast.error(response.message);
      }
    }

    //   this.setState({
    //     email: this.props.userInfor.user.email,
    //     password: this.props.userInfor.user.password,
    //     username: this.props.userInfor.user.username,
    //     address: this.props.userInfor.user.address,
    //     phoneNumber: this.props.userInfor.user.phoneNumber,
    //     fullname: this.props.userInfor.user.fullname,
    //   });
    // }
  };
  render() {
    // const options = [
    //   { value: "F", label: "Nam" },
    //   { value: "M", label: "Nữ" },
    //   { value: "O", label: "Khác" },
    // ];
    // let { selectedOption } = this.state;
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
            <div className="form-group mt-2 col-6">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "username");
                }}
                value={this.state.username}
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
              <label>Fullname</label>
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
            {/* <div className="form-group col-6 mt-2">
              <label>Giới tính</label>
              <Select
                value={selectedOption}
                onChange={this.handleOnchangeSelect}
                options={options}
              />
            </div> */}
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
