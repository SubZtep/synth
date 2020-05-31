import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
// import * as serviceWorker from "./serviceWorker"
import "../node_modules/98.css/dist/98.css"
import "../node_modules/98.css/dist/docs.css"
import "../node_modules/98.css/dist/vs.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
