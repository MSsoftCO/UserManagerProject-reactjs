import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import "bootstrap/dist/js/bootstrap.min";
import "font-awesome/css/font-awesome.css";
import "vazir-font/dist/font-face.css";
import App from "./components/App";

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>,
  document.getElementById("root")
);
serviceWorker.register();
