import React, { Component } from "react";
import "./IconItem.scss";
import BasicFolderIcon from "../../Icons/BasicFolderIcon";
import FileIcon from "../../Icons/FileIcon";


type IconItemProps = {
  resultClickHandler: () => void,
  fileType: string,
  inputValue: string
}

class IconItem extends Component<IconItemProps, {}> {
  constructor(props: IconItemProps) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  MAXIMAL_LENGTH = 30;
  handleChange = (e: any) => {};
  translate = (carr: any) => {
    return carr;
  };
  render() {
    return (
      <div
        className="IconItem hover click"
        onClick={this.props.resultClickHandler}
      >
        <div className="icon-and-title">
          {this.props.fileType === "folder" ? (
            <BasicFolderIcon
              className="folder-icon"
              width="50px"
              height="50px"
            ></BasicFolderIcon>
          ) : (
            <FileIcon
              className="folder-icon"
              width="50px"
              height="50px"
            ></FileIcon>
          )}

          <div className="filename">
            {this.props.inputValue.substr(0, this.MAXIMAL_LENGTH) +
              (this.props.inputValue.length > this.MAXIMAL_LENGTH ? "..." : "")}
          </div>
        </div>
      </div>
    );
  }
}
export default IconItem;
