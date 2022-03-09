import React, { Component } from "react";
import { connect } from "react-redux";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import ModalUser from "./ModalUser";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }
  handleOpenModal = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  render() {
    return (
      <>
        <Homeheader />
        <div>Hello from register</div>
        <button type="button" onClick={() => this.handleOpenModal()}>
          Open Modal
        </button>
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleFromParent}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
