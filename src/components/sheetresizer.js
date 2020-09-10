import React, { Component } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

const Resizerst = styled.div`
  width: 4px;
  height: 90px;
  float: left;
  cursor: col-resize;
  position: absolute;
  zindex: 10;
  background-color: orange;
`; //route에서 작동암함

class SheetResizerHorizontal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      ...props
    };
  }
  makeresizer() {
    //const Draggable = ReactDraggable;
    let right = 0;
    return this.props.columninfo.map((width, i) => {
      //transform: "translateX("+(column.left-2)+"px)",// 안되는건 의문 안에서 이미쓰고있는듯
      const style = {
        height:this.props.height+"px",
        width:this.props.width+"px",
      };
      right += width;
      let index = i+this.props.from;
      return (
        <Draggable
          key={index}
          axis="x"
          handle=".resizer"
          position={{ x: right, y: 0 }}
          onStart={this.props.dragStart}
          onDrag={this.props.dragOver}
          onStop={this.props.dragEnd.bind(this, index)}
        >
          <div
            style={style}
            className="resizer"
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
          ></div>
        </Draggable>
      );
    });
  }

  render() {
    const style = {
      position: "relative",
      zIndex: 1
    };
    return (
      <div
        style={style}
        className="resizerbox"
        ref={ref => {
          this.box = ref;
        }}
      >
        {this.makeresizer()}
      </div>
    );
  }
}

export {SheetResizerHorizontal};

class SheetResizerVertical extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      ...props
    };
  }
  makeresizer() {
    //const Draggable = ReactDraggable;
    let top = 0;
    return this.props.columninfo.map((height, i) => {
      //transform: "translateX("+(column.left-2)+"px)",// 안되는건 의문 안에서 이미쓰고있는듯
      const style = {
        height:this.props.height+"px",
        width:this.props.width+"px",
      };
      top += height;
      let index = i+this.props.from;
      return (
        <Draggable
          key={index}
          axis="y"
          handle=".resizer"
          position={{ x: 0, y: top }}
          onStart={this.props.dragStart}
          onDrag={this.props.dragOver}
          onStop={this.props.dragEnd.bind(this, index)}
        >
          <div
            style={style}
            className="resizer"
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
          ></div>
        </Draggable>
      );
    });
  }

  render() {
    const style = {
      position: "relative",
      zIndex: 1
    };
    return (
      <div
        style={style}
        className="resizerbox"
        ref={ref => {
          this.box = ref;
        }}
      >
        {this.makeresizer()}
      </div>
    );
  }
}

export {SheetResizerVertical};
