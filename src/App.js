import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

//redux 관련
import { createStore,applyMiddleware  } from "redux";
import { Provider } from "react-redux";
import asyncDispatchMiddleware from './store/middleware/asyncDispatchMiddleware';
import rootReducer from "./store/rootreducer";
//import withReduxEnhancer from "addon-redux/enhancer"

export const store = createStore(rootReducer,applyMiddleware(asyncDispatchMiddleware));

import Counter from "./testcounter";

import ExcelExample from "./example/excel_example";
import ReduxExample from "./example/redux_example";
import "./style/defaultstyle.css";

const GlobalStyle = createGlobalStyle`
  body {
    font-size:15px;
    fomt-family:'Hind' , sans-serif;
  }
`;

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <ul>
              <li>
                <Link to={"/"}>HOME</Link>
              </li>
              <li>
                <Link to={"/Excel"}>Excel</Link>
              </li>
            </ul>
            <Route path="/Excel" component={ExcelExample} />
          </div>
          <GlobalStyle />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
