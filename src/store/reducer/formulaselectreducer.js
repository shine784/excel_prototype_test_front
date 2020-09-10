import axios from 'axios';

// 액션 타입 정의
const FORMULARANK = 'FORMULARANK' ;
const FORMULASELECT = 'FORMULASELECT' ;
const FORMULAEXCUTE = 'FORMULAEXCUTE' ;
const TARGETCANVASUPDATE = 'TARGETCANVASUPDATE' ;
const TEXTCHANGE = 'TEXTCHANGE';
const CLICKCANVAS = 'CLICKCANVAS'
const SCROLLREACT = 'SCROLLREACT'

let initialState = {
    sheetinfo:{
      //보류
    },
    selectmode: false,
    tarsq:{
      pos:[0,0],
      rect:[70,20],
      activesq:[0,0],
      "fromX":0,
      "fromY":0,
      "toX":0,
      "toY":0
    },
    tartext:"",
    forsq:{
      pos:[0,0],
      rect:[0,0],
      activesq:[0,0],
      "fromX":0,
      "fromY":0,
      "toX":0,
      "toY":0
    },
    fortext:"",
    temptargetSheet:null,
    viewnums:{
      hpagecnt:[0,1,2],
      vpagecnt:[0,1,2],
      hcolumns:new Array(9999).fill(70),
      vcolumns:new Array(9999).fill(20),
    },
} ;

const formulaselectreducer = (state = initialState, action) => {
    switch(action.type) {
        case SCROLLREACT:
          return Object.assign({}, state, {
            viewnums:{
              hpagecnt:action.payload.hpagecnt,
              vpagecnt:action.payload.vpagecnt,
              hcolumns:state.viewnums.hcolumns,
              vcolumns:state.viewnums.vcolumns,
            },
          }); //end scrollevent
        case FORMULAEXCUTE:
          //sum
          var {fromX,fromY,toX,toY} = state.forsq;
          axios({
            method: 'post',
            url: 'http://192.168.13.90:3333/formulas/sum',
            data:
            {
              "fromX":fromX,
              "fromY":fromY,
              "toX":toX,
              "toY":toY
            },
          })
          .then(function (response) {
            action.asyncDispatch({ type: TEXTCHANGE , payload:response.data});
           })
          .catch(function (error) {
            console.log(error);
          })
          return Object.assign({}, state, {
            selectmode:false,
          });
        case FORMULARANK:
            //sum
            var {fromX,fromY,toX,toY} = state.forsq;
            axios({
              method: 'post',
              url: 'http://192.168.13.90:3333/formulas/rank',
              data:
              {
                "target":
                  {
                    "x":parseInt(action.payload.x),
                    "y":parseInt(action.payload.y)
                  },
                "ref":
                  {
                  "fromX":fromX,
                  "fromY":fromY,
                  "toX":toX,
                  "toY":toY
                  }
              },
            })
            .then(function (response) {
              action.asyncDispatch({ type: TEXTCHANGE , payload:response.data});
             })
            .catch(function (error) {
              console.log(error);
            })
            return Object.assign({}, state, {
              selectmode:false,
            });
        case FORMULASELECT:
        return Object.assign({}, state, {
                selectmode:true,
        });

        case TARGETCANVASUPDATE:
            var {startX,startY,endX,endY,sheetArray,hcolumns,vcolumns,hacc,vacc,text} = action.payload;
            const tileNum = ~~(startX/25) + "/"+ ~~(startY/25);
            const targetSheet = sheetArray[~~(startY/25)][~~(startX/25)];//커서가 들어간 myCanvas
            targetSheet.state.data[startY % 25][startX % 25].stringdata = text;//this.tarsq.input.value;
            targetSheet.state.data[startY % 25][startX % 25].doubledata = Number(text);//this.tarsq.input.value;
            let arr = targetSheet.state.data;
            axios({
              method: 'put',
              url: 'http://192.168.13.90:3333/tiles/'+tileNum,
              data:arr,
            })
            .then(function (response) {

             })
            .catch(function (error) {
              console.log(error);
            })
            targetSheet.setState({
              data:arr
            })
            return Object.assign({}, state, {
              ...state
            });
        case CLICKCANVAS:
            // issue scroll을 드래그하는건데 mouseup이 불리면서 click이벤트가 불려버림 
            var {startX,startY,endX,endY,sheetArray,hcolumns,vcolumns,hacc,vacc} = action.payload;
            const targetCanvas = sheetArray[~~(startY/25)][~~(startX/25)];//커서가 들어간 myCanvas
            var text = targetCanvas.state.data[~~(startY % 25)][~~(startX % 25)].stringdata;
            const width = hcolumns.reduce((acc,d,i)=>{
              if(Math.min(startX,endX) <=i && i <= Math.max(startX,endX)){
                return acc += d;
              }
              return acc;
            },0)
            const height = vcolumns.reduce((acc,d,i)=>{
              if(Math.min(startY,endY) <=i && i <= Math.max(startY,endY)){
                return acc += d;
              }
              return acc;
            },0)
            const active_square_width = hcolumns[startX]
            const active_square_height = vcolumns[startY]
            const posX = hacc[Math.min(startX,endX)]
            const posY = vacc[Math.min(startY,endY)]
            if(state.selectmode){
              return Object.assign({}, state, {
                      forsq:{
                        pos:[posX,posY],
                        rect:[width,height],
                        activesq:[active_square_width,active_square_height],
                        "fromX":startX,
                        "fromY":startY,
                        "toX":endX,
                        "toY":endY,
                      },
                      fortext:text,
              });
            }//formulaselect
            return Object.assign({}, state, {
                    tarsq:{
                      pos:[posX,posY],
                      rect:[width,height],
                      activesq:[active_square_width,active_square_height],
                      "fromX":startX,
                      "fromY":startY,
                      "toX":endX,
                      "toY":endY,
                    },
                    tartext:text,
            });
        case TEXTCHANGE:
          return Object.assign({}, state, {
            tartext:action.payload,
    });
        default:
            return state ;
    }
}
export default formulaselectreducer;
