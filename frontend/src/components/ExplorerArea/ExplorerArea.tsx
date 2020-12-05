import React, { Component } from "react";
import "./ExplorerArea.scss";
import { send } from "../../api";
import Input from "../Input/Input";
import ResultsIcons from "../ResultsIcons/ResultsIcons";
var path = require("path");

type ExplorerAreaState = {
  inputValue: any,
  results: undefined[],
  resultsMetaData: undefined[],
  viewType: string,
  history: undefined[],
  historyCursor: number
};

type ExplorerAreaProps = {
  currentPath: string,
}
class ExplorerArea extends Component<ExplorerAreaProps, ExplorerAreaState> {
  constructor(props: ExplorerAreaProps) {
    super(props);
    this.state = {
      inputValue: this.props.currentPath,
      results: [],
      resultsMetaData: [],
      viewType: "icons",
      history: [],
      historyCursor: 0
    };
  }
  componentDidMount() {
    this.updateResultsFromInputValue(this.state.inputValue);
  }

  updateResultsFromEvent = async (e: any) => {
    if (e.keyCode === 13) {
      this.updateResultsFromInputValue(e.target.value);
    } else {
      this.setState({ inputValue: e.target.value });
    }
  };
  updateResultsFromInputValue = async (inputValue: string) => {
    await this.setState({ inputValue: inputValue });
    var results = await this.listDirTrimmed(inputValue, "list");
    await this.setState({ results: results });
    var metaDatas = await this.listWithMetadata(inputValue, "list");
    await this.setState({ resultsMetaData: metaDatas });
    this.updateHistory();
  };
  launch = async (item: any) => {
    await send(item, "launch");
  };
  // no need for action
  listDirTrimmed = async (item: any, action: any) => {
    var response = await send(item, action);
    // make 10 variable depending on font size
    const max_length = 20;
    return response.body.backendOutput["dirs"]
      .map((filename: string) =>
        filename.length <= max_length
          ? filename
          : filename.substring(0, max_length - 3) + "..."
      )
      .concat(
        response.body.backendOutput["files"].map((filename: string) =>
          filename.length <= max_length
            ? filename
            : filename.substring(0, max_length - 3) + "..."
        )
      );
  };
  //TODO: refactor this with listDir
  //TODO: change in backend and put dir/file in metadata
  listWithMetadata = async (item: any, action: any) => {
    var response = await send(item, action);
    // make 10 variable depending on font size
    var metaDatas: any = [];
    response.body.backendOutput["dirs"].forEach((filename: any) =>
      metaDatas.push({
        fileType: "folder",
        fileName: filename
      })
    );
    response.body.backendOutput["files"].forEach((filename: string) =>
      metaDatas.push({
        fileType: "file",
        fileName: filename
      })
    );
    return metaDatas;
  };

  previousPage = async () => {
    if (this.state.history.length > 1) {
      await this.setState({ historyCursor: this.state.historyCursor - 1 })
      await this.setState({
        inputValue: this.state.history[this.state.historyCursor - 1]
      });
      var results = await this.listDirTrimmed(this.state.inputValue, "list");
      this.setState({ results: results });
      var metaDatas = await this.listWithMetadata(
        this.state.inputValue,
        "list"
      );
      await this.setState({ resultsMetaData: metaDatas });
    }
  };
  nextPage = async () => {
    await this.setState({ historyCursor: this.state.historyCursor + 1 })
    await this.setState({
      inputValue: this.state.history[this.state.historyCursor - 1]
    });
    var results = await this.listDirTrimmed(this.state.inputValue, "list");
    this.setState({ results: results });
    var metaDatas = await this.listWithMetadata(this.state.inputValue, "list");
    await this.setState({ resultsMetaData: metaDatas });
  };
  updateHistory = async () => {

    if (this.state.history.length === this.state.historyCursor) {
      await this.state.history.push(this.state.inputValue);
    } else if (this.state.history[this.state.historyCursor] !== this.state.inputValue) {
      let newHistory = this.state.history.slice(0, this.state.historyCursor)
      newHistory.push(this.state.inputValue)
      await this.setState({ history: newHistory })
    }
    await this.setState({ historyCursor: this.state.historyCursor + 1 })
  };
  render() {
    return (
      <div className="ExplorerArea">
        <div></div>
        <div>
          <Input
            inputStateUpdater={this.updateResultsFromEvent}
            inputValue={this.state.inputValue}
          />
          <button
            onClick={() => {
              this.previousPage();
            }}
            className="previous-page-button"
          >
            {"<--"}
          </button>
          <button
            onClick={() => {
              this.nextPage();
            }}
            className="next-page-button"
          >
            {"-->"}
          </button>
          {this.state.viewType === "icons" ? (
            <ResultsIcons
              results={this.state.results}
              metaDatas={this.state.resultsMetaData}
              openFile={(item: any, fileType: any) => {
                fileType === "folder"
                  ? this.updateResultsFromInputValue(
                    path.join(this.state.inputValue, item)
                  )
                  : this.launch(path.join(this.state.inputValue, item));
              }}
            />
          ) :
            // TODO: results list
            (
              <ResultsIcons
                results={this.state.results}
                metaDatas={this.state.resultsMetaData}
                openFile={(item: any, fileType: any) => {
                  fileType === "folder"
                    ? this.updateResultsFromInputValue(
                      path.join(this.state.inputValue, item)
                    )
                    : this.launch(path.join(this.state.inputValue, item));
                }}
              />
            )}
        </div>
      </div>
    );
  }
}
export default ExplorerArea;
