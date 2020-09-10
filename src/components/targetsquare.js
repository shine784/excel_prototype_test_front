import React, { Component } from "react";
//import ContainerRow from "./Row";
import styled from "styled-components";
import { connect } from "react-redux";
import { clickcanvas,textchange,formulaexcute } from "../store/action/defaultevent";

class TargetSquare extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
  }
  componentDidUpdate() {
    //this.input.focus();
  }
  componentWillUpdate() {

  }
  getCursor(e){
    //this.input.focus();
  }
  textChange = (e) =>{
    //e.stopPropagation();
    this.props.textchange(e,this.input.value)
  }
  updateSheet = (e) =>{
    this.props.trigger();
  }
  render() {
    const {activesq,rect,pos} = this.props.drawinfo;
    const {text} = this.props;

    const sqstyle = {
      border:"2px solid black",
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
      <input
        contentEditable="true"
        style={inputstyle}
        ref={ref => {
        this.input = ref;
        }}
        onScroll={(e)=>e.preventDefault()}
        onBlur={this.updateSheet}
        onChange={this.textChange}
        onClick={(e)=>this.getCursor(e)}
        type="text"
        value={text || ""}
        >
       </input>
      </div>
    )
  }

}
const mapStateToProps = (state, ownProps) => ({//얘는 props 값
  drawinfo:state.formulaselectreducer.tarsq,
  text:state.formulaselectreducer.tartext,
  ownProps
});

const mapDispatchToProps = {clickcanvas,textchange,formulaexcute};// 얘는  props 이벤트

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TargetSquare);
