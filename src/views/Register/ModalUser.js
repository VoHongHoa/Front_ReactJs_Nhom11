import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { handleRegisterUser } from "../../services/UserService";
import { toast } from "react-toastify";
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
      gender: "",
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
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "fullName",
      "address",
      "phoneNumber",
      "gender",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      // console.log(this.state[arrInput[i]]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter: ${arrInput[i]}`);
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
      if (response.message === "User created") {
        toast.success(response.message);
      } else {
        toast.error("Register Failed");
      }
    }
    //
  };
  render() {
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
            <div class="form-group col-6 mt-2">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "email");
                }}
                value={this.state.email}
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div class="form-group mt-2 col-6">
              <label for="exampleInputEmail1">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "password");
                }}
                value={this.state.password}
              />
            </div>

            <div class="form-group mt-2">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Name"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "fullName");
                }}
                value={this.state.firstName}
              />
            </div>

            <div class="form-group mt-2">
              <label for="exampleInputEmail1">Address</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Name"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>

            <div class="form-group col-6 mt-2">
              <label for="exampleInputEmail1">Phone Number</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Phone Number"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "phoneNumber");
                }}
                value={this.state.phoneNumber}
              />
            </div>
            <div class="form-group col-6 mt-2">
              <label for="exampleInputEmail1">Gender</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Gender"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "gender");
                }}
                value={this.state.gender}
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
