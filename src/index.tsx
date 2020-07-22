import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import App from "./App"
// import * as serviceWorker from "./serviceWorker"
import { Global, css } from "@emotion/core"

ReactDOM.render(
  // <React.StrictMode>
  <Fragment>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          width: 100vw;
          height: 100vh;
          font-family: Arial;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
        }
        .react-flow__controls-button {
          width: 25px;
          height: 25px;
        }
        .react-flow__node.audioNode {
          border: 2px solid #ccc;
          border-radius: 3px;
          background-color: #eee;
          padding: 10px;
          &.selected {
            border-color: #222;
          }
        }
        .react-flow__edge {
          .react-flow__edge-path {
            stroke: #33c;
          }
          &.selected .react-flow__edge-path {
            stroke-width: 2.5;
          }
        }
      `}
    />
    <App />
  </Fragment>,
  // </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
