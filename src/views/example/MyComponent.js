import React from "react";
import Childcomponent from "./ChildComponnet";
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      arrPeople: [
        // { firstName: "Vo", lastName: "Hoa" },
        // { firstName: "Tran", lastName: "Tong" },
        // { firstName: "Vo", lastName: "Tien" },
        // { firstName: "Nguyen", lastName: "Mai" },
      ],
    };
  }
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleAdd = () => {
    let { arrPeople } = this.state;
    arrPeople.push({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
    //console.log("check arr", arrPeople);
    this.setState({
      arrPeople: arrPeople,
    });
  };
  render() {
    let { firstName, lastName, arrPeople } = this.state;
    return (
      <React.Fragment>
        <div>
          <label>First Name: </label>
          <input
            value={this.state.name}
            onChange={(event) => this.handleOnchangeInput(event, "firstName")}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            value={this.state.name}
            onChange={(event) => this.handleOnchangeInput(event, "lastName")}
          />
        </div>

        <div>
          Hello, Your name is {firstName} {lastName}
        </div>
        <button onClick={() => this.handleAdd()}>Add</button>

        <Childcomponent arrPeople={arrPeople} />
      </React.Fragment>
    );
  }
}

export default MyComponent;
