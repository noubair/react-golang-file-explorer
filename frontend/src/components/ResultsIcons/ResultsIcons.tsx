import React from "react";
import "./ResultsIcons.scss";
import IconItem from "../IconItem/IconItem";

type ResultsIconsProps = {
  results: any,
  metaDatas: any,
  openFile: any
}


const ResultsIcons = (resultsIconsProps: ResultsIconsProps) => {
  const listHandler = (results: any) => {
    return results == null ? [] : results;
  };
  return (
    <div className="ResultsIcons">
      {listHandler(resultsIconsProps.metaDatas).map((metaData: any, i: any) => (
        <IconItem
          key={i}
          inputValue={metaData["fileName"]}
          fileType={metaData["fileType"]}
          resultClickHandler={() => {
            resultsIconsProps.openFile(metaData["fileName"], metaData["fileType"]);
          }}
        />
      ))}
    </div>
  );
};
export default ResultsIcons;
