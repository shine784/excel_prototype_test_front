let initialState = {
    number: 0,
    id:""
} ;

const firstreducer = (state = { CompInfo: {number:0}, dummy:null}, action) => {

    switch(action.type) {
        case INCREMENT:
            state.CompInfo[action.payload.tableId].number++;
            state.CompInfo = Object.assign({}, state.CompInfo);
            state.CompInfo["park"].number  =  state.CompInfo["kim"].number/2;
            return {
                ...state,
            } ;
        case DECREMENT:
            state.CompInfo[action.payload.tableId].number--;
            state.CompInfo = Object.assign({}, state.CompInfo);
            state.CompInfo["park"].number  =  state.CompInfo["kim"].number/2;
            return {
                ...state,
            } ;
        case SAVEINFO:
            if(state.CompInfo[action.payload.tableId]){
              return {
                  ...state,
              } ;
            }
            state.CompInfo[action.payload.tableId] = action.payload.tableData
            return {
                ...state,
            } ;
        default:
            return state ;
    }
}

export default firstreducer;

// 액션 타입 정의
const INCREMENT = 'INCREMENT' ;
const DECREMENT = 'DECREMENT' ;
const SAVEINFO = 'SAVEINFO'

// 액션 생성 함수 정의
export const increment = (tableSettings) => ({ type: INCREMENT , payload:{
    tableId:tableSettings.id ,
} }) ;
export const decrement = (tableSettings) => ({ type: DECREMENT , payload:{
    tableId:tableSettings.id ,
} }) ;
export const saveinfo =  (tableSettings) =>({
type: "SAVEINFO",
payload:{
    tableId:tableSettings.id ,
    tableData: {
           apple: true,
           grape: false,
           banana: 1,
           orange: "hello",
           melon: function abc(){console.log("world");},
           number:0,
   },
}
})
