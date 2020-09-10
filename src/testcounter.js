import React, { Component } from "react";
import { connect } from "react-redux";
import { increment, decrement, saveinfo } from "./store/reducer/firstreducer";
//temp
class Counter extends Component {
  constructor(props) {
    super(props);
    this.props.saveinfo(props);
  }

  incrementfunc = () => {
    this.props.increment(this.props);
  };
  decrementfunc = () => {
    this.props.decrement(this.props);
  };

  render() {
    const { id } = this.props;
    const { number } = this.props.CompInfo[id];
    const style = {
      float: "left",
      marginRight: "100px"
    };
    return (
      <div style={style}>
        <h1>{number}</h1>
        <h1>{id}</h1>
        <button onClick={this.incrementfunc}>+</button>
        <button onClick={this.decrementfunc}>-</button>
      </div>
    );
  }
}

const mapStateToProps = (todo, ownProps) => ({
  //2
  CompInfo: todo.firstreducer.CompInfo,
  ownProps
});

const mapDispatchToProps = { increment, decrement, saveinfo }; //1

export default connect(
  // 스토어와 연결
  mapStateToProps,
  mapDispatchToProps
)(Counter);
//temp
