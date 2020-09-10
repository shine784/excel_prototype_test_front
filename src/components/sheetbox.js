import React, { Component } from "react";
//import ContainerRow from "./Row";
import styled from "styled-components";
import axios from 'axios';

class SheetBox extends Component {
  constructor(props) {
    super(props);
    this.page = null;
  }
  getTile = () =>{
    let arr = undefined;
    let {tilex,tiley} = this.props;
    let _this = this;
    axios({
      method: 'get',
      url: 'http://192.168.13.90:3333/tiles/'+tilex+"/"+tiley,
    })
    .then(function (response) {
        //console.log(response.data);
        let arr = response.data;
        if(arr.length==0){//1. 일단그린다 빈걸로 2. 내용이있으면 update 3.내용이없으면 create  (서버처리가나을듯 없으면 create로)
          _this.createTile(tilex,tiley);
        }else{
          _this.setState({
            data:arr
          })
        }
     })
    .catch(function (error) {
        console.log(error);
    })
    this.initTile(tilex,tiley);
  }
  initTile = (tilex,tiley) => {
    //초기화
    let arr = new Array(25).fill(null).map((d,i)=>{
      return new Array(25).fill(null).map((g,j)=>{
        return Object({
          abx:25 * tilex + i,
          aby:25 * tiley + j,
          stringdata:"",
          doubledata:null,
          formula:null,
          style:null,
          x:i,
          y:j,
          tilex: tilex,
          tiley: tiley,
        })
      });
    })//초기데이터
    this.setState({
      data:arr
    })
  }
  createTile = (tilex,tiley) => {
    axios({
      method: 'post',
      url: 'http://192.168.13.90:3333/tiles/',
      data:{
        "tilex":tilex,
        "tiley":tiley,
      }
    })
    .then(function (response) {
       //console.log(error);
     })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount(){
    this.getTile();
    var canvas = this.page;
    var ctx = canvas.getContext("2d");
    this.ctx = ctx;
  }
  componentDidUpdate() {//update떄는 실제 데이터나 fomula를 그린다
    //console.log(this.state.data,this.props.tileNum);
    var canvas = this.page;
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.page.width, this.page.height);
    ctx.font = "13px arial,sans-serif";
    const {fromx,fromy,hcolumns,vcolumns,hacc,vacc} = this.props;
    const {data} = this.state;//data 서버에서받아온값
    for (var i = 0; i < 25; i++){
      for (var j = 0; j < 25; j++){
      let backgroundColor = data[i][j].style || '#FFFFFF';
      //cell
      ctx.beginPath();
      ctx.fillStyle = backgroundColor;
      ctx.rect(hacc[fromx + j] - hacc[fromx], vacc[fromy + i] - vacc[fromy], hcolumns[fromx+j], vcolumns[fromy+i]);
      ctx.fill();
      }
    }

    ctx.beginPath();
      for (var i = 0; i < 25; i++){
        for (var j = 0; j < 25; j++){
        let text = "";
        text = data[i][j].stringdata;
        let fontColor = '#000000';
        //text
        ctx.fillStyle = fontColor; //font fill
        ctx.strokeStyle = "grey";//cell stroke
        ctx.lineWidth = "1";
        ctx.fillText(text , hacc[fromx + j] - hacc[fromx], vacc[fromy + i+1] - vacc[fromy]);
        //cell
        ctx.rect(hacc[fromx + j] - hacc[fromx], vacc[fromy + i] - vacc[fromy], hcolumns[fromx+j], vcolumns[fromy+i]);
        }
      }
      ctx.stroke();//그래픽스 개념으로써 stroke 를 fill보다 나중에 해야함
  }
  componentWillUpdate() {}
  render() {
    const pagestyle={
        top:this.props.top,
        left:this.props.left,
        position:"absolute",
    }
    return(
      <canvas
      style={pagestyle}
      ref={ref => {
        this.page = ref;
      }}
      id="myCanvas" width={this.props.width} height={this.props.height}>
      Your browser does not support the canvas element.
      </canvas>
    );
  }

}
export default SheetBox;
