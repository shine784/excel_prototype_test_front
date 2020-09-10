
const FORMULASELECT = 'FORMULASELECT' ;
const FORMULAEXCUTE = 'FORMULAEXCUTE' ;
const FORMULARANK  = 'FORMULARANK' ;
const TARGETCANVASUPDATE = 'TARGETCANVASUPDATE' ;
const TEXTCHANGE = 'TEXTCHANGE';
const CLICKCANVAS = 'CLICKCANVAS';
const SCROLLREACT = 'SCROLLREACT';

// 액션 생성 함수 정의
export const formularank = (e,x,y) => ({ type: FORMULARANK , payload:{"x":x,"y":y}}) ;
export const formulaexcute = (e) => ({ type: FORMULAEXCUTE , payload:{}}) ;
export const formulaselect = (e) => ({ type: FORMULASELECT , payload:{}}) ;
export const targetcanvasupdate = (e,obj) => ({ type: TARGETCANVASUPDATE , payload:obj });
export const textchange = (e,text) => ({ type: TEXTCHANGE , payload:text});
export const clickcanvas = (e,obj) => ({ type: CLICKCANVAS , payload:obj});
export const scrollreact = (e,obj) => ({ type: SCROLLREACT , payload:obj});
