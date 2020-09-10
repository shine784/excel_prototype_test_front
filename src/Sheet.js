import React, { Component } from "react";

//redux
import { connect } from "react-redux";
import { clickcanvas, targetcanvasupdate ,scrollreact } from "./store/action/defaultevent";
//redex end


import SheetBox from "./components/sheetbox";
import TargetSquare from "./components/targetsquare";
import FormulaSquare from "./components/formulasquare";
import {SheetResizerHorizontal, SheetResizerVertical} from "./components/sheetresizer";
import ReactDom from "react-dom";
import axios from 'axios';
import styled from "styled-components";

export const sheetinfo = React.createContext({});

class Sheet extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      hpagecnt:[0,1,2],
      vpagecnt:[0,1,2],
      hcolumns:new Array(9999).fill(70),
      vcolumns:new Array(9999).fill(20),
    };*/
    this.focusgeo = [0,0];
    this.hacc = null;
    this.vacc = null;
    this.sheetArray = new Array(100).fill(null).map((d,i)=>new Array(100).fill(null))
    this.scrollChange = _.debounce(this.scrollChange, 50);
  }
  __SettingVirtual(top,left){
      let startX = Math.max(0,~~(this.calcX(left)/25));//canvas 좌표만 따로받아 최적화필요
      let startY = Math.max(0,~~(this.calcY(top)/25));//canvas 좌표만 따로받아 최적화필요
      let hpagecnt = new Array(3).fill(0).map(()=>startX++)
      let vpagecnt = new Array(3).fill(0).map(()=>startY++)
      this.scrollChange(hpagecnt,vpagecnt);
  }
  scrollChange = (hpagecnt,vpagecnt) => {
    this.props.scrollreact(event,{ hpagecnt: hpagecnt, vpagecnt: vpagecnt });
  };
  scrollhandler = (e) => {
    if(e.target.tagName=="INPUT"){return;}//왜 CLAss 이벤트가 들어오지?
    let top = parseInt(event.srcElement.scrollTop);
    let left = parseInt(event.srcElement.scrollLeft);
    this.__SettingVirtual(top, left);
    this.vruler.style.top = -top + "px";
    this.hruler.style.left = -left + "px";
  }
  mouseOutHandler = (e) =>{
    //this.celldrag = false;
  }
  mouseDownHandler = (e) =>{
    if(e.target.tagName=="INPUT"){return;}//왜 CLass 이벤트가 들어오지?
    this.celldrag = true;
    var x = event.offsetX + event.target.offsetLeft;
    var y = event.offsetY + event.target.offsetTop;
    this.startX =  this.endX = this.calcX(x);
    this.startY =  this.endY = this.calcY(y);
  }
  mouseOverHandler = (e) => {
    if(e.target.tagName=="INPUT"){return;}//왜 CLAss 이벤트가 들어오지?
    if(this.celldrag!=true){return;}
    var x = event.offsetX + event.target.offsetLeft;
    var y = event.offsetY + event.target.offsetTop;
    this.endX = this.calcX(x);
    this.endY = this.calcY(y);
    let {hpagecnt,vpagecnt,hcolumns,vcolumns} = this.props.viewnums;
    this.props.clickcanvas(
      e,
      {startX:this.startX,
       startY:this.startY,
       endX:this.endX,
       endY:this.endY,
       sheetArray:this.sheetArray,
       hcolumns:this.hcolumns,
       vcolumns:this.vcolumns,
       hacc:this.hacc,
       vacc:this.vacc,
    });
  }
  mouseUpHandler = (e) => {
    let {hpagecnt,vpagecnt,hcolumns,vcolumns} = this.props.viewnums;
    if(this.celldrag!=true){return;}
    this.celldrag = false;
    this.focusgeo = [this.startX,this.startY]
    this.props.clickcanvas(
      e,
      {startX:this.startX,
       startY:this.startY,
       endX:this.endX,
       endY:this.endY,
       sheetArray:this.sheetArray,
       hcolumns:hcolumns,
       vcolumns:vcolumns,
       hacc:this.hacc,
       vacc:this.vacc,
    });
  }
  //updateTile ***
  focusCanvasUpdate = (e) =>{
    let {hpagecnt,vpagecnt,hcolumns,vcolumns} = this.props.viewnums;
    this.props.targetcanvasupdate(e,
        {  startX:this.focusgeo[0],
           startY:this.focusgeo[1],
           endX:this.endX,
           endY:this.endY,
           sheetArray:this.sheetArray,
           hcolumns:hcolumns,
           vcolumns:vcolumns,
           hacc:this.hacc,
           vacc:this.vacc,
           text:event.target.value,
        });
  }
  dragStart = () => {
    this.originX = event.x;
    this.originY = event.y;
  };
  dragOver = () => {

  };
  dragEndX = idx => {
    let {hpagecnt,vpagecnt,hcolumns,vcolumns} = this.props.viewnums;
    let delta = event.x - this.originX;
    hcolumns[idx] += delta;
    this.forceUpdate();
  }
  dragEndY = idx => {
    let {hpagecnt,vpagecnt,hcolumns,vcolumns} = this.props.viewnums;
    let delta = event.y - this.originY;
    vcolumns[idx] += delta;
    this.forceUpdate();
  }
  calcX(x){
    //binary search
    const acc = this.hacc;
    let start=0, end=acc.length-1;
    while (start<=end){
      let mid=Math.floor((start + end)/2);
      if (acc[mid]<=x && x <acc[mid+1]) return mid;
      else if (acc[mid] < x)
           start = mid + 1;
      else
           end = mid - 1;
    }
   return 0;
  }
  calcY(y){
    //binary search
    const acc = this.vacc;
    let start=0, end=acc.length-1;
    while (start<=end){
      let mid=Math.floor((start + end)/2);
      if (acc[mid]<=y && y <acc[mid+1]) return mid;
      else if (acc[mid] < y)
           start = mid + 1;
      else
           end = mid - 1;
    }
   return 0;
  }
  __init(){
    let {hpagecnt,vpagecnt,hcolumns,vcolumns} = this.props.viewnums;
    let res =0;
    this.hacc = hcolumns.map((d,i)=>{
      if(!i){
        return 0;
      }
      res += hcolumns[i-1];
      return res;
    })
    res = 0;
    this.vacc = vcolumns.map((d,i)=>{
      if(!i){
        return 0;
      }
      res += vcolumns[i-1];
      return res;
    })
  }
  render() {
    this.__init();
    const mainstyle = {
      position:"relative",
      width:"1500px",
      height:"600px"
    }
    const style = {
        width:"1450px",
        height:"585px",
        position:"relative",
        overflow:"auto",
    };
    const sec01 = {
      width:"50px",
      height:"15px",
      position:"absolute",
      overflow:"hidden",
      backgroundColor:"#333333"
    }
    const sec02 = {
      left:"50px",
      height:"15px",
      width:"1450px",
      position:"absolute",
      overflow:"hidden",
    }
    const sec03 = {
      top:"15px",
      width:"50px",
      height:"585px",
      position:"absolute",
      overflow:"hidden",
    }
    const sec04 = {
      left:"50px",
      top:"15px",
      position:"absolute",
      overflow:"hidden",
    }
    let {hpagecnt,vpagecnt,hcolumns,vcolumns} = this.props.viewnums;
    return (
      <div id="mainframe"
      style={mainstyle}
      >
      <div id="section01"
      style={sec01}
      ></div>
      <div id="section02"
      style={sec02}
      >
          <div
          id="hruler"
          style={{position:"relative"}}
          ref={ref => {
            this.hruler = ref;
          }}
          >
          {hpagecnt.map((h,i)=>{
            const rst = {
              float:"left",
              top:"0px",
              left:this.hacc[h*25]+"px",
              position:"absolute",
              width:this.hacc[(h+1)*25]-this.hacc[h*25]+"px",
              height:"15px"
            };
            let pos = 0;
            let from = h*25;
            let columninfo = hcolumns.slice(from,from+25);
            return (
              <div
              key={h}
              style={rst}
              >
              <SheetResizerHorizontal
                columninfo={columninfo}
                width={2}
                height={15}
                from = {from}
                dragStart={this.dragStart}
                dragOver={this.dragOver}
                dragEnd={this.dragEndX}
                ref={ref => {
                  this.sheetresizer = ref;
                }}
              ></SheetResizerHorizontal>
              {columninfo.map((w,j)=>{
                  const ws = {
                    float:"left",
                    height:"15px",
                    width:w+"px",
                    border:"1px solid black",
                    backgroundColor:"grey",
                  };
                  return (
                    <div key={j} style={ws}>
                    {h*25+j}
                    </div>
                  )
              })}
              </div>
            )
          })}
          </div>//hruler end
      </div>
      <div id="section03"
      style={sec03}
      >
      <div
      id="vruler"
      style={{position:"relative"}}
      ref={ref => {
        this.vruler = ref;
      }}
      >
      {vpagecnt.map((v,i)=>{
        const rst = {
          top:this.vacc[v*25]+"px",
          left:"0px",
          position:"absolute",
          width:"50px",
          height:this.vacc[(v+1)*25]-this.hacc[v*25]+"px",
        };
        let pos = 0;
        let from = v*25;
        let columninfo = vcolumns.slice(from,from+25);
        return (
          <div
          key={v}
          style={rst}
          >
          <SheetResizerVertical
            columninfo={columninfo}
            width={50}
            height={2}
            from = {from}
            dragStart={this.dragStart}
            dragOver={this.dragOver}
            dragEnd={this.dragEndY}
            ref={ref => {
              this.sheetresizer = ref;
            }}
          ></SheetResizerVertical>
          {columninfo.map((h,j)=>{
              const ws = {
                float:"left",
                height:h+"px",
                width:"50px",
                border:"1px solid black",
                backgroundColor:"grey",
              };
              return (
                <div key={j} style={ws}>
                {v*25+j}
                </div>
              )
          })}
          </div>
        )
      })}
      </div>
      </div>
      <div id="section04"
      style={sec04}
      ref={ref => {
        this.sec04 = ref;
      }}
      >
      <div
      className="viewport"
      style={style}
      onScroll={this.scrollhandler}
      onClick={(e)=>e.preventDefault()}
      onMouseDown={this.mouseDownHandler}
      onMouseUp={this.mouseUpHandler}
      onMouseMove={this.mouseOverHandler}
      onMouseOut={this.mouseOutHandler}
      >
      <TargetSquare
      key="tarsq"
      trigger={this.focusCanvasUpdate}
      />
      <FormulaSquare
      key="fumulasq"
      />
      {hpagecnt.map((h,i)=>{
          return vpagecnt.map((v,j)=>{
            return (
              <SheetBox
              ref={ref => {
                this.sheetArray[v][h] = ref;
              }}
              fromx={25*h}
              fromy={25*v}
              hcolumns={hcolumns}
              vcolumns={vcolumns}
              width={this.hacc[(h+1)*25]-this.hacc[h*25]}
              height={this.vacc[(v+1)*25]-this.vacc[v*25]}
              hacc={this.hacc}
              vacc={this.vacc}
              key={v+"-"+h}
              tilex={h}
              tiley={v}
              top={this.vacc[v*25]+"px"}
              left={this.hacc[h*25]+"px"}
              />
            )
          })
      })}
      </div>
      </div>
      </div>
    )
  }

};
const mapDispatchToProps = {clickcanvas, targetcanvasupdate, scrollreact }; //1

const mapStateToProps = (state, ownProps) => ({//얘는 props 값
  viewnums:state.formulaselectreducer.viewnums,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sheet);
//export default Sheet;
