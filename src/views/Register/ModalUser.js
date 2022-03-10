import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { handleRegisterUser } from "../../services/UserService";
import { toast } from "react-toastify";
import Select from "react-select";

import "./ModalUser.scss";
class ModalRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
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
      "fullName",
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
      console.log("check state:", this.state);
      let response = await handleRegisterUser(this.state);
      if (response && response.message === "User created") {
        toast.success(response.message);
        this.setState({
          email: "",
          password: "",
          fullName: "",
          address: "",
          phoneNumber: "",
          selectedOption: "",
        });
      } else {
        toast.error("Register Failed");
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
        //centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create New User
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-user-container row">
            <div className="form-group col-6 mt-2">
              <label>Email address</label>
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
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "fullName");
                }}
                value={this.state.firstName}
              />
            </div>

            <div className="form-group mt-2">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>

            <div className="form-group col-6 mt-2">
              <label>Phone Number</label>
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
              <label>Gender</label>
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
            Save
          </Button>{" "}
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRegister);
