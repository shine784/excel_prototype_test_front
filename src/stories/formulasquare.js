import { connect } from 'react-redux'
import FormulaSquare  from '../components/formulasquare';
import React, { Component } from "react";
import styled from "styled-components";
//import { clickcanvas } from "../store/action/defaultevent";

const mapStateToProps = (state, ownProps) => ({//얘는 props 값
    drawinfo:state.formulaselectreducer.forsq,
    ownProps
  });

const mapDispatchToProps = {  };// 얘는  props 이벤트

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulaSquare);