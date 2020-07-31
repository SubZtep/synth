import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import React, { Fragment } from "react"
import { Global, css } from "@emotion/core"
// import * as serviceWorker from "./serviceWorker"
import { fal } from "@fortawesome/pro-light-svg-icons"
import { fas } from "@fortawesome/pro-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fad } from "@fortawesome/pro-duotone-svg-icons"
import { far } from "@fortawesome/pro-regular-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import store from "./store"
import App from "./App"

//TODO: collect icons and check sizes https://fontawesome.com/how-to-use/on-the-web/using-with/react#using
library.add(fab, fad, fal, far, fas)

ReactDOM.render(
  // <React.StrictMode>
  <Fragment>
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&family=Tomorrow&display=swap");
        * {
          box-sizing: border-box;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          width: 100vw;
          height: 100vh;
          font-family: Roboto, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          background-color: #000;
        }
        button {
          font-family: Tomorrow, sans-serif;
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
