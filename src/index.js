import React from "react"
import ReactDOM from "react-dom"
import smoothscroll from "smoothscroll-polyfill"
import App from "./app"

// kick off the polyfill!
smoothscroll.polyfill()
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
