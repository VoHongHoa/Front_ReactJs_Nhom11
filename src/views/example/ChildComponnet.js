import React from "react";
import "./ChildComponent.scss";
class Childcomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowList: false,
    };
  }
  handleShowList = () => {
    this.setState({
      isShowList: true,
    });
  };
  handleHideList = () => {
    this.setState({
      isShowList: false,
    });
  };
  render() {
    let { isShowList } = this.state;
    let { arrPeople } = this.props;
    return (
      <React.Fragment>
        <div>List People</div>
        <div>
          {isShowList === true ? (
            <div>
              {arrPeople &&
                arrPeople.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.firstName} {item.lastName}
                    </div>
                  );
                })}
              <button onClick={() => this.handleHideList()}>Hide</button>
            </div>
          ) : (
            <button onClick={() => this.handleShowList()}>Show</button>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default Childcomponent;
