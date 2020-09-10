import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { formulaselect, formulaexcute,formularank} from "../store/action/defaultevent";

class FomulaSelect extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }
  componentDidUpdate(){
    //this.input.focus();
  }
  componentWillUpdate() {

  }
  formulaselect = (e) => {
      this.formulatype = e.target.selectedIndex;
      this.props.formulaselect(e);
  };
  formulaexcute = (e) => {
    if(this.formulatype<2){
      this.props.formulaexcute(e);
    }else{
      this.props.formularank(e,this.input1.value,this.input2.value);
    }
  };
  render() {
    const fomstyle={

    }
    return(
      <div
      style={fomstyle}
      >
      <form action="">
        <label>Choose the fomula</label>
        <select name="fomula" id="fomula"
        onChange={this.formulaselect}
        >
          <option value="sum">SUM1</option>
          <option value="avg">SUM2</option>
          <option value="rank">RANK</option>
          <option value="multiple">MULTIPLY</option>
        </select>
        <br/><br/>
        <input
         onChange={(e)=>e.preventDefault()}
         type="text" value={this.props.text}
        />
        </form>
        <button type="submit" value="formula" style={{width:"100px",height:"40px"}}
        onClick={this.formulaexcute}
        >
        [계산]
        </button>
        <input
         onChange={(e)=>e.preventDefault()}
         type="text" placeholder="RANK 용 X좌표"
         ref={(ref) => { this.input1 = ref; }}
        />
        <input
         onChange={(e)=>e.preventDefault()}
         type="text" placeholder="RANK 용 Y좌표"
         ref={(ref) => { this.input2 = ref; }}
        />
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  text:state.formulaselectreducer.tartext,
  ownProps
});

const mapDispatchToProps = { formulaselect, formulaexcute,formularank}; //1

export default connect(
  // 스토어와 연결
  mapStateToProps,
  mapDispatchToProps
)(FomulaSelect);
