import React, { Component } from "react";
//import ContainerRow from "./Row";
import styled from "styled-components";
import { connect } from "react-redux";
import { clickcanvas } from "../store/action/defaultevent";

class FormulaSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos:[0,0],
      rect:[10,10],
      activesq:[0,0],
    };
  }
  componentDidMount(){
  }
  componentDidUpdate() {
  }
  componentWillUpdate() {
  }

  render() {
        const {activesq,rect,pos} = this.props.drawinfo;

    const sqstyle = {
      border:"2px dotted black",
      width:rect[0],
      height:rect[1],
      position:"absolute",
      overflow:"hidden",
      zIndex:10,
      left:pos[0],
      top:pos[1],
    }
    const inputstyle={
      width:activesq[0],
      height:activesq[1],
      outline: 'none',
    }
    return(
      <div
      style={sqstyle}
      >
      </div>
    )
  }

}



//export default FormulaSquare;
const mapStateToProps = (state, ownProps) => ({//얘는 props 값
  drawinfo:state.formulaselectreducer.forsq,
  ownProps
});
const mapDispatchToProps = { clickcanvas };// 얘는  props 이벤트

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulaSquare);
