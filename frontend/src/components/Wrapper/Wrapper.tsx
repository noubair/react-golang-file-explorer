import "./Wrapper.scss";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ExplorerArea from "../ExplorerArea";

interface WrapperProps {
  width: number,
  height: string,
  xPositionArg: number,
  children: any
}

const Wrapper = (WrapperProps: WrapperProps) => {

  const [xPosition, setX] = React.useState(-WrapperProps.width);
  const [currentPath, setCurrentPath] = React.useState(
    "/"
  );
  
  React.useEffect(() => {
    setX(0);
  }, []);
  return (
    <div>
      <React.Fragment>
        <div className="Wrapper">
          <div
            className="side-bar"
            style={{
              transform: `translatex(${-WrapperProps.width}px)`,
              width: WrapperProps.width,
              minHeight: WrapperProps.height
            }}
          >
            {WrapperProps.children}
          </div>

          <div
            className="content"
            style={{
              marginLeft: 0,
              width: "98vw",
              position: "absolute",
              display: "inline-block"
            }}
          >
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path={["/explorer" ,"/"]}
                  render={props => (
                    <ExplorerArea
                      currentPath={currentPath}
                    ></ExplorerArea>
                  )}
                ></Route>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};
export default Wrapper;
