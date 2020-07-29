import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./store"
import App from "./App"
// import * as serviceWorker from "./serviceWorker"
import { Global, css } from "@emotion/core"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fad } from "@fortawesome/pro-duotone-svg-icons"
import { fal } from "@fortawesome/pro-light-svg-icons"
import { far } from "@fortawesome/pro-regular-svg-icons"
import { fas } from "@fortawesome/pro-solid-svg-icons"

//TODO: collect icons and check sizes https://fontawesome.com/how-to-use/on-the-web/using-with/react#using
library.add(fab, fad, fal, far, fas)

ReactDOM.render(
  // <React.StrictMode>
  <Fragment>
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Tomorrow&display=swap");
        * {
          box-sizing: border-box;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          width: 100vw;
          height: 100vh;
          font-family: Tomorrow, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          background-color: #000;
        }
        button {
          font-family: Tomorrow, sans-serif;
        }
        .react-flow__controls-button {
          width: 25px;
          height: 25px;
          opacity: 0.5;
        }
        .react-flow__handle {
          width: 1rem;
          height: 1rem;
        }
        .react-flow__node.audioNode {
          border: 2px solid #212d40;
          border-radius: 3px;
          background-color: #212d40;
          color: #fff;
          padding: 10px;
          &.selected {
            border-color: #aebdd5;
          }
        }
        .react-flow__edge {
          .react-flow__edge-path {
            stroke: #33c;
          }
          &.selected .react-flow__edge-path {
            stroke-width: 2.5;
            stroke: #aebdd5;
          }
        }
      `}
    />
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>,
  // </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
