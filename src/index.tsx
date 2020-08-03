import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import React, { Fragment } from "react"
import { Global } from "@emotion/core"
import { ToastContainer, toast } from "react-toastify"
// import * as serviceWorker from "./serviceWorker"
import { fal } from "@fortawesome/pro-light-svg-icons"
import { fas } from "@fortawesome/pro-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fad } from "@fortawesome/pro-duotone-svg-icons"
import { far } from "@fortawesome/pro-regular-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import "react-toastify/dist/ReactToastify.css"
import { globalStyles } from "./styled"
import store from "./store"
import App from "./App"

//TODO: collect icons and check sizes https://fontawesome.com/how-to-use/on-the-web/using-with/react#using
library.add(fab, fad, fal, far, fas)

ReactDOM.render(
  // <React.StrictMode>
  <Fragment>
    <Global styles={globalStyles} />
    <Provider store={store}>
      <App />
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </Provider>
  </Fragment>,
  // </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
