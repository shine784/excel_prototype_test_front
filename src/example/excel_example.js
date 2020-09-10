import React, { useState, Component } from "react";
import styled from "styled-components";
import Sheet from "../Sheet";
import FomulaSelect from "../components/fomulaselect";

class TimeGrpah extends Component {//canvas 간단한 예제
  constructor(props) {
    super(props);
    this.canvas = null;
    this.time = 0;
    this.geo = [];
  }
  componentDidMount(){
    let ctx = this.canvas.getContext("2d");
    let img = new Image();
    this.img = img;
    img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
    this.timer = window.setInterval(this.draw,500);
    window.setTimeout(()=>{window.clearInterval(this.timer)},50000)
  }
  componentDidUpdate(){

  }
  draw = () => {
    let ctx = this.canvas.getContext("2d");
    if(this.geo.length > 5){
      this.geo.splice(0,1)
    }
    this.geo.push(~~(Math.random() * 50));
    ctx.clearRect(0,0,200,200);
    ctx.drawImage(this.img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96 - this.geo[0]);//start
    for(let i=0;i<this.geo.length;i++){
      ctx.lineTo(30+(i*30), 96 - this.geo[i]);
    }
    ctx.stroke();
    //console.log(~~(Math.random() * 50),~~(Math.random() * 100),this.time);
  }
  render(){
        const TGstyle ={

        }
        return(
          <canvas
          style={TGstyle}
          ref={ref => {
            this.canvas = ref;
          }}
          id="myTimeGraph" width="180px" height="130px">
          Your browser does not support the canvas element.
          </canvas>
        )
  }
}


class ExcelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
        <div>
        <FomulaSelect/>
        <TimeGrpah/>
        <Sheet/>
        </div>
    );
  }
};

export default ExcelExample;
