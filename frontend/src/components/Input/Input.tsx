import React, { Component } from "react";
import "./Input.scss";
type InputState = {
  newContent: any | string
};

type InputProps = {
    inputStateUpdater: (e: any) => void,
    inputValue: any
    
}


class Input extends Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = {
      newContent: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  async handleChange(e: any) {
    this.setState({
      newContent: e.target.value
    });
    this.props.inputStateUpdater(e);
  }
  async handleEnter(event: any) {
    this.props.inputStateUpdater(event);
  }
  translate = (carr: any) => {
    return carr;
  };
  render() {
    return (
      <div className="Input">
        <input
          type="text"
          className="query-input"
          name="input"
          placeholder="Enter content here..."
          onChange={this.handleChange}
          onKeyDown={this.handleEnter}
          value={this.props.inputValue}
        />
      </div>
    );
  }
}
export default Input;
