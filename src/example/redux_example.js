import React, { Component } from "react";
import ReactDom from "react-dom";

import Counter from "../testcounter";

const ReduxExample = props => {
  return (
    <div>
      <Counter id="kim" />
      <Counter id="kim" />
      <Counter id="lee" />
      <Counter id="lee" />
      <Counter id="park" />
    </div>
  );
};

export default ReduxExample;
